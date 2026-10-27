import assert from "node:assert/strict";
import test from "node:test";
import { applyAction, invoiceBalance, invoiceStatus, loadState, orderStatus, remainingItems, seedState, today, totals } from "./model.js";

const create = (type = "sale", overrides = {}) => ({ type: "saveOrder", order: { type, partyId: type === "sale" ? "c1" : "s1", date: today(), vat: "inclusive", discount: 0, status: "draft", items: [{ productId: "p1", qty: 4, price: type === "sale" ? 8400 : 5600 }], ...overrides } });
const act = (state, action, actor = "admin") => applyAction(state, actor, action);

test("seed data has working accounts, valid documents, and fictional contacts", () => {
  const state = seedState();
  assert.equal(state.users.length, 3);
  assert.equal(state.orders.length, 5);
  assert.equal(state.shipments.length, 2);
  assert.equal(state.invoices.length, 2);
  assert.equal(state.payments.length, 1);
  assert.ok(state.users.every((user) => user.email.endsWith(".example")));
  for (const invoice of state.invoices) assert.ok(state.shipments.some((shipment) => shipment.id === invoice.shipmentId));
  assert.equal(invoiceBalance(state, state.invoices.find((invoice) => invoice.type === "receivable")), 28000);
});

test("complete a sales flow with approval, partial deliveries, invoicing, and partial collection", () => {
  let state = seedState();
  const openingStock = state.products[0].stock;
  state = act(state, create());
  const orderId = state.orders[0].id;
  assert.equal(orderStatus(state, state.orders[0]), "draft");
  assert.throws(() => act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 2 }] }), /Approve/);
  state = act(state, { type: "approve", orderId });
  state = act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 1 }] });
  assert.equal(orderStatus(state, state.orders[0]), "partial");
  assert.equal(remainingItems(state, state.orders[0])[0].remaining, 3);
  assert.equal(state.products[0].stock, openingStock - 1);
  state = act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 3 }] });
  assert.equal(orderStatus(state, state.orders[0]), "completed");
  assert.equal(state.products[0].stock, openingStock - 4);
  const shipments = state.shipments.filter((shipment) => shipment.orderId === orderId);
  assert.equal(shipments.reduce((total, shipment) => total + shipment.total, 0), totals(state.orders[0]).total);
  for (const shipment of shipments) {
    state = act(state, { type: "issueInvoice", shipmentId: shipment.id });
    const invoiceId = state.invoices[0].id;
    const amount = state.invoices[0].amount;
    state = act(state, { type: "pay", invoiceId, amount: amount / 2, method: "Bank transfer", reference: "TEST-PARTIAL" });
    assert.equal(invoiceStatus(state, state.invoices[0]), "partial");
    state = act(state, { type: "pay", invoiceId, amount: amount / 2, method: "Cash", reference: "TEST-FINAL" });
    assert.equal(invoiceStatus(state, state.invoices[0]), "paid");
    assert.equal(invoiceBalance(state, state.invoices[0]), 0);
  }
  assert.ok(state.activity.some((item) => item.action === "Recorded collection"));
});

test("purchase receiving increases stock and supports supplier settlement", () => {
  let state = seedState();
  const opening = state.products[0].stock;
  state = act(state, create("purchase", { status: "approved" }));
  state = act(state, { type: "fulfill", orderId: state.orders[0].id, items: [{ productId: "p1", qty: 4 }] });
  assert.equal(state.products[0].stock, opening + 4);
  assert.equal(state.movements[0].type, "IN");
  state = act(state, { type: "issueInvoice", shipmentId: state.shipments[0].id });
  assert.equal(state.invoices[0].type, "payable");
  state = act(state, { type: "pay", invoiceId: state.invoices[0].id, amount: state.invoices[0].amount, method: "Check", reference: "TEST-CHECK-001" });
  assert.equal(invoiceStatus(state, state.invoices[0]), "paid");
});

test("failed stock checks are atomic, including multi-product deliveries", () => {
  let state = seedState();
  state = act(state, create("sale", { status: "approved", items: [{ productId: "p1", qty: 1, price: 8400 }, { productId: "p3", qty: 100, price: 16800 }] }));
  const before = JSON.stringify(state);
  assert.throws(() => act(state, { type: "fulfill", orderId: state.orders[0].id, items: [{ productId: "p1", qty: 1 }, { productId: "p3", qty: 100 }] }), /Insufficient stock/);
  assert.equal(JSON.stringify(state), before);
});

test("prevent over-receiving, duplicate product lines, negative quantities, and duplicate invoices", () => {
  let state = seedState();
  assert.throws(() => act(state, create("sale", { items: [{ productId: "p1", qty: 1, price: 10 }, { productId: "p1", qty: 1, price: 10 }] })), /only once/);
  state = act(state, create("purchase", { status: "approved" }));
  const orderId = state.orders[0].id;
  assert.throws(() => act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 5 }] }), /exceeds/);
  assert.throws(() => act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: -1 }] }), /non-negative/);
  state = act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 4 }] });
  state = act(state, { type: "issueInvoice", shipmentId: state.shipments[0].id });
  assert.throws(() => act(state, { type: "issueInvoice", shipmentId: state.shipments[0].id }), /already exists/);
  assert.throws(() => act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 1 }] }), /exceeds/);
});

test("payments cannot exceed the outstanding amount or be negative", () => {
  const state = seedState();
  const invoice = state.invoices.find((item) => item.type === "receivable");
  for (const amount of [-10, 0, 28000.01, NaN, Infinity]) assert.throws(() => act(state, { type: "pay", invoiceId: invoice.id, amount, method: "Cash", reference: "TEST" }), /Payment must/);
  assert.throws(() => act(state, { type: "pay", invoiceId: invoice.id, amount: 1, method: "Cash", reference: "" }), /reference/);
});

test("permissions protect every mutation, team management is Admin only", () => {
  const state = seedState();
  for (const type of ["saveOrder", "approve", "cancel", "fulfill", "issueInvoice", "pay", "saveMaster"]) assert.throws(() => act(state, { type }, "viewer"), /read-only/);
  assert.throws(() => act(state, { type: "saveMaster", collection: "users", record: {} }, "operator"), /Only the Admin/);
  assert.throws(() => act(state, create(), "missing"), /Sign in/);
  const next = act(state, create(), "operator");
  assert.equal(next.orders.length, state.orders.length + 1);
});

test("approved orders are locked, cancelled records remain, posted orders cannot be cancelled", () => {
  let state = seedState();
  state = act(state, create());
  const draftId = state.orders[0].id;
  state = act(state, { type: "cancel", orderId: draftId });
  assert.equal(orderStatus(state, state.orders[0]), "cancelled");
  assert.throws(() => act(state, { type: "approve", orderId: draftId }), /cannot be changed/);
  state = act(state, create("sale", { status: "approved" }));
  assert.throws(() => act(state, create("sale", { ...state.orders[0], status: "draft" })), /Only draft/);
  const id = state.orders[0].id;
  state = act(state, { type: "fulfill", orderId: id, items: [{ productId: "p1", qty: 1 }] });
  assert.throws(() => act(state, { type: "cancel", orderId: id }), /cannot be cancelled/);
});

test("inclusive, exclusive and zero-rated totals reconcile with partial discount allocation", () => {
  assert.deepEqual(totals({ items: [{ qty: 1, price: 112 }], vat: "inclusive", discount: 0 }), { subtotal: 112, discount: 0, net: 100, vat: 12, total: 112 });
  assert.equal(totals({ items: [{ qty: 1, price: 100 }], vat: "exclusive", discount: 0 }).total, 112);
  assert.equal(totals({ items: [{ qty: 1, price: 100 }], vat: "zero", discount: 10 }).total, 90);
  for (const vat of ["inclusive", "exclusive", "zero"]) {
    let state = act(seedState(), create("sale", { status: "approved", vat, discount: 1, items: [{ productId: "p1", qty: 3, price: 10.01 }] }));
    const orderId = state.orders[0].id;
    for (let i = 0; i < 3; i++) state = act(state, { type: "fulfill", orderId, items: [{ productId: "p1", qty: 1 }] });
    const posted = state.shipments.filter((shipment) => shipment.orderId === orderId);
    assert.equal(Math.round(posted.reduce((total, item) => total + item.total, 0) * 100), Math.round(totals(state.orders[0]).total * 100));
    assert.equal(Math.round(posted.reduce((total, item) => total + item.vat, 0) * 100), Math.round(totals(state.orders[0]).vat * 100));
  }
});

test("new products start empty, duplicate SKUs and self-demotion are blocked", () => {
  let state = seedState();
  const product = { name: "Demo device", sku: "DEMO-NEW", price: 100, cost: 60, minimum: 3, stock: 999 };
  state = act(state, { type: "saveMaster", collection: "products", record: product });
  assert.equal(state.products[0].stock, 0);
  assert.throws(() => act(state, { type: "saveMaster", collection: "products", record: product }), /already exists/);
  assert.throws(() => act(state, { type: "saveMaster", collection: "users", record: { ...state.users[0], role: "Viewer" } }), /Keep your current/);
});

test("invalid browser data safely starts a fresh demo", () => {
  for (const stored of [null, "broken-json", "{}", '{"version":2}', '{"version":1,"users":[]}']) assert.equal(loadState({ getItem: () => stored }).users.length, 3);
  assert.equal(loadState({ getItem: () => { throw new Error("disabled"); } }).orders.length, 5);
  const state = seedState();
  assert.deepEqual(loadState({ getItem: () => JSON.stringify(state) }), state);
});

test("the workspace starts even if the browser blocks access to localStorage itself", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, get() { throw new Error("Storage blocked"); } });
  try { assert.equal(loadState().users.length, 3); }
  finally {
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else delete globalThis.localStorage;
  }
});
