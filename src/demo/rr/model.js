export const STORAGE_KEY = "rr-erp-demo-v1";
export const SESSION_KEY = "rr-erp-session-v1";
export const DEMO_PASSWORD = "RRdemo2026!";
export const round = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
export const today = () => new Date().toLocaleDateString("en-CA");
const id = () => globalThis.crypto.randomUUID();
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
const sum = (rows, get) => round(rows.reduce((total, row) => total + get(row), 0));
export const money = (amount) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount || 0);
export const dateLabel = (date) => new Date(date.length === 10 ? `${date}T12:00:00` : date).toLocaleDateString("en-PH", { day: "numeric", month: "short", year: "numeric" });

export function totals(order) {
  const subtotal = sum(order.items, (item) => round(item.qty * item.price));
  const discount = round(Number(order.discount) || 0);
  const base = round(subtotal - discount);
  const net = order.vat === "inclusive" ? round(base / 1.12) : base;
  const vat = order.vat === "inclusive" ? round(base - net) : order.vat === "exclusive" ? round(net * .12) : 0;
  return { subtotal, discount, net, vat, total: round(net + vat) };
}

export function seedState() {
  const users = [
    { id: "admin", name: "Alex Morgan", email: "admin@rr.example", role: "Admin", department: "Management", password: DEMO_PASSWORD },
    { id: "operator", name: "Jamie Cruz", email: "operations@rr.example", role: "Operations", department: "Operations", password: DEMO_PASSWORD },
    { id: "viewer", name: "Taylor Reyes", email: "viewer@rr.example", role: "Viewer", department: "Finance", password: DEMO_PASSWORD },
  ];
  const products = [
    { id: "p1", sku: "RR-NET-001", name: "8-port PoE Network Switch", category: "Networking", unit: "unit", price: 8400, cost: 5600, stock: 24, minimum: 8 },
    { id: "p2", sku: "RR-CAM-002", name: "4MP Security Camera", category: "Security", unit: "unit", price: 4200, cost: 2800, stock: 38, minimum: 10 },
    { id: "p3", sku: "RR-ACC-003", name: "Biometric Access Terminal", category: "Access control", unit: "unit", price: 16800, cost: 11200, stock: 6, minimum: 8 },
    { id: "p4", sku: "RR-CBL-004", name: "Cat6 Network Cable · 305m", category: "Networking", unit: "box", price: 6720, cost: 4480, stock: 16, minimum: 5 },
    { id: "p5", sku: "RR-NVR-005", name: "16-channel Network Recorder", category: "Security", unit: "unit", price: 22400, cost: 15680, stock: 9, minimum: 4 },
    { id: "p6", sku: "RR-UPS-006", name: "1000VA Power Backup", category: "Power", unit: "unit", price: 5600, cost: 3920, stock: 18, minimum: 6 },
  ];
  const customers = [
    { id: "c1", name: "Northstar Workspace", contact: "Morgan Lee", email: "morgan@northstar.example", phone: "0900 000 1001", address: "12 Demo Avenue, Quezon City", terms: "Net 30" },
    { id: "c2", name: "Evergreen Retail Group", contact: "Sam Rivera", email: "sam@evergreen.example", phone: "0900 000 1002", address: "45 Sample Street, Pasig City", terms: "Net 15" },
    { id: "c3", name: "Bluebird Hospitality", contact: "Casey Tan", email: "casey@bluebird.example", phone: "0900 000 1003", address: "8 Example Road, Makati City", terms: "Cash on delivery" },
  ];
  const suppliers = [
    { id: "s1", name: "Summit Technology Supply", contact: "Jordan Lim", email: "orders@summit.example", phone: "0900 000 2001", address: "21 Sample Park, Mandaluyong", terms: "Net 30" },
    { id: "s2", name: "Atlas Network Distribution", contact: "Avery Santos", email: "sales@atlas.example", phone: "0900 000 2002", address: "9 Demo Drive, Taguig City", terms: "Net 15" },
    { id: "s3", name: "Cedar Systems Trading", contact: "Riley Diaz", email: "hello@cedar.example", phone: "0900 000 2003", address: "16 Example Lane, Marikina", terms: "Cash on delivery" },
  ];
  const state = { version: 1, users, products, customers, suppliers, orders: [], shipments: [], invoices: [], payments: [], movements: [], activity: [], counters: {} };
  const order = (type, partyId, items, status, remarks) => transact(state, users[0], { type: "saveOrder", order: { type, partyId, items, date: today(), vat: "inclusive", discount: 0, remarks, status } });
  order("sale", "c1", [{ productId: "p1", qty: 3, price: 8400 }, { productId: "p2", qty: 6, price: 4200 }], "approved", "Office security refresh · sample transaction");
  order("sale", "c2", [{ productId: "p3", qty: 2, price: 16800 }], "draft", "Access control installation");
  order("purchase", "s1", [{ productId: "p3", qty: 12, price: 11200 }, { productId: "p1", qty: 10, price: 5600 }], "approved", "Replenish access-control stock");
  order("sale", "c3", [{ productId: "p5", qty: 2, price: 22400 }, { productId: "p6", qty: 2, price: 5600 }], "approved", "Lobby camera system · sample completed flow");
  const sampleSale = state.orders[0];
  transact(state, users[0], { type: "fulfill", orderId: sampleSale.id, items: sampleSale.items.map((item) => ({ productId: item.productId, qty: item.qty })), reference: "RR-DEMO-DELIVERY" });
  transact(state, users[0], { type: "issueInvoice", shipmentId: state.shipments[0].id });
  transact(state, users[0], { type: "pay", invoiceId: state.invoices[0].id, amount: 28000, method: "Bank transfer", reference: "RR-DEMO-PAYMENT" });
  order("purchase", "s2", [{ productId: "p4", qty: 5, price: 4480 }], "approved", "Structured cabling stock");
  const samplePurchase = state.orders[0];
  transact(state, users[0], { type: "fulfill", orderId: samplePurchase.id, items: samplePurchase.items.map((item) => ({ productId: item.productId, qty: item.qty })), reference: "RR-DEMO-RECEIPT" });
  transact(state, users[0], { type: "issueInvoice", shipmentId: state.shipments[0].id });
  return state;
}

export function loadState(storage) {
  try {
    const state = JSON.parse((storage || globalThis.localStorage).getItem(STORAGE_KEY));
    const arrays = ["users", "products", "customers", "suppliers", "orders", "shipments", "invoices", "payments", "movements", "activity"];
    if (state?.version === 1 && arrays.every((key) => Array.isArray(state[key])) && state.counters && state.users.some((user) => user.role === "Admin")) return state;
  } catch { /* A fresh workspace also works when storage is unavailable. */ }
  return seedState();
}

export const partyFor = (state, order) => state[order.type === "sale" ? "customers" : "suppliers"].find((party) => party.id === order.partyId);
export const invoiceBalance = (state, invoice) => round(invoice.amount - sum(state.payments.filter((payment) => payment.invoiceId === invoice.id), (payment) => payment.amount));
export const invoiceStatus = (state, invoice) => invoiceBalance(state, invoice) === 0 ? "paid" : invoiceBalance(state, invoice) < invoice.amount ? "partial" : "unpaid";
export const remainingItems = (state, order) => order.items.map((item) => ({ ...item, remaining: round(item.qty - sum(state.shipments.filter((shipment) => shipment.orderId === order.id).flatMap((shipment) => shipment.items).filter((line) => line.productId === item.productId), (line) => line.qty)) }));
export function orderStatus(state, order) {
  if (order.status !== "approved") return order.status;
  const remaining = remainingItems(state, order);
  return remaining.every((item) => item.remaining === 0) ? "completed" : remaining.some((item) => item.remaining < item.qty) ? "partial" : "approved";
}

function nextNumber(state, type) {
  state.counters[type] = (state.counters[type] || 0) + 1;
  return `RR-${type}-${String(state.counters[type]).padStart(4, "0")}`;
}
function log(state, actor, action, reference, module) {
  state.activity.unshift({ id: id(), at: new Date().toISOString(), actor: actor.name, action, reference, module });
}
function validateItems(state, items) {
  requireThat(Array.isArray(items) && items.length > 0, "Add at least one product.");
  requireThat(new Set(items.map((item) => item.productId)).size === items.length, "Each product can appear only once. Update its quantity instead.");
  for (const item of items) {
    requireThat(state.products.some((product) => product.id === item.productId), "Choose a valid product.");
    requireThat(Number.isSafeInteger(Number(item.qty)) && Number(item.qty) > 0 && Number(item.qty) <= 100000, "Quantities must be whole numbers between 1 and 100,000.");
    requireThat(Number.isFinite(Number(item.price)) && Number(item.price) >= 0 && Number(item.price) <= 100000000, "Enter a valid unit price.");
  }
}

// All changes use one transaction boundary: failed validation never alters state.
export function applyAction(state, actorId, action) {
  const next = structuredClone(state);
  const actor = next.users.find((user) => user.id === actorId);
  requireThat(actor, "Sign in to continue.");
  requireThat(actor.role !== "Viewer", "The Viewer account has read-only access. Use Admin or Operations to make changes.");
  transact(next, actor, action);
  return next;
}

function transact(state, actor, action) {
  if (action.type === "saveOrder") {
    const input = action.order;
    requireThat(["sale", "purchase"].includes(input.type), "Invalid order type.");
    const previous = input.id ? state.orders.find((order) => order.id === input.id) : null;
    requireThat(!input.id || previous, "Order not found.");
    requireThat(!previous || (previous.status === "draft" && previous.type === input.type), "Only draft orders can be edited.");
    requireThat(state[input.type === "sale" ? "customers" : "suppliers"].some((party) => party.id === input.partyId), "Select a customer or supplier.");
    requireThat(/^\d{4}-\d{2}-\d{2}$/.test(input.date) && !Number.isNaN(Date.parse(input.date)), "Choose a valid order date.");
    requireThat(["inclusive", "exclusive", "zero"].includes(input.vat), "Choose a VAT treatment.");
    requireThat(["draft", "approved"].includes(input.status), "Choose a valid order status.");
    validateItems(state, input.items);
    const items = input.items.map((item) => ({ productId: item.productId, qty: Number(item.qty), price: round(Number(item.price)) }));
    const discount = Number(input.discount || 0);
    requireThat(Number.isFinite(discount) && discount >= 0 && discount <= totals({ items, vat: input.vat, discount: 0 }).subtotal, "Discount cannot exceed the subtotal.");
    const record = { id: previous?.id || id(), number: previous?.number || nextNumber(state, input.type === "sale" ? "SO" : "PO"), type: input.type, partyId: input.partyId, date: input.date, vat: input.vat, discount: round(discount), remarks: String(input.remarks || "").slice(0, 2000), status: input.status, items };
    if (previous) state.orders[state.orders.indexOf(previous)] = record;
    else state.orders.unshift(record);
    log(state, actor, previous ? "Updated order" : "Created order", record.number, input.type === "sale" ? "Sales" : "Purchasing");
    return;
  }
  if (action.type === "approve" || action.type === "cancel") {
    const order = state.orders.find((row) => row.id === action.orderId);
    requireThat(order, "Order not found.");
    requireThat(action.type === "approve" ? order.status === "draft" : ["draft", "approved"].includes(order.status), "This order cannot be changed.");
    requireThat(!state.shipments.some((shipment) => shipment.orderId === order.id), "Orders with posted receipts or deliveries cannot be cancelled.");
    order.status = action.type === "approve" ? "approved" : "cancelled";
    log(state, actor, action.type === "approve" ? "Approved order" : "Cancelled order", order.number, order.type === "sale" ? "Sales" : "Purchasing");
    return;
  }
  if (action.type === "fulfill") {
    const order = state.orders.find((row) => row.id === action.orderId);
    requireThat(order?.status === "approved", "Approve the order before posting a receipt or delivery.");
    requireThat(Array.isArray(action.items) && action.items.length > 0, "Enter at least one quantity.");
    requireThat(new Set(action.items.map((item) => item.productId)).size === action.items.length, "Duplicate product lines are not allowed.");
    requireThat(action.items.every((item) => Number.isSafeInteger(Number(item.qty)) && Number(item.qty) >= 0), "Quantities must be non-negative whole numbers.");
    const remaining = remainingItems(state, order);
    const items = action.items.filter((item) => Number(item.qty) > 0).map((line) => {
      const original = remaining.find((item) => item.productId === line.productId);
      const product = state.products.find((item) => item.id === line.productId);
      requireThat(original && product, "Choose a product from this order.");
      const qty = Number(line.qty);
      requireThat(Number.isSafeInteger(qty) && qty > 0 && qty <= original.remaining, `Quantity for ${product.name} exceeds the remaining order balance.`);
      requireThat(order.type !== "sale" || qty <= product.stock, `Insufficient stock for ${product.name}. Receive a purchase order first.`);
      return { productId: product.id, qty, price: original.price };
    });
    requireThat(items.length > 0, "Enter at least one quantity greater than zero.");
    const allocatedDiscount = round(totals(order).discount * sum(items, (item) => item.qty * item.price) / (totals(order).subtotal || 1));
    const earlier = state.shipments.filter((shipment) => shipment.orderId === order.id);
    const isLast = remaining.every((item) => item.remaining === (items.find((line) => line.productId === item.productId)?.qty || 0));
    const computed = totals({ items, vat: order.vat, discount: allocatedDiscount });
    // The final document absorbs rounding so partial fulfillment totals reconcile.
    if (isLast) {
      computed.total = round(totals(order).total - sum(earlier, (shipment) => shipment.total));
      computed.vat = round(totals(order).vat - sum(earlier, (shipment) => shipment.vat));
      computed.net = round(computed.total - computed.vat);
    }
    const shipment = { id: id(), number: nextNumber(state, order.type === "sale" ? "DR" : "GR"), orderId: order.id, type: order.type === "sale" ? "delivery" : "receiving", date: today(), reference: String(action.reference || "").slice(0, 120), items, ...computed };
    for (const item of items) {
      const product = state.products.find((row) => row.id === item.productId);
      product.stock += order.type === "purchase" ? item.qty : -item.qty;
      state.movements.unshift({ id: id(), date: today(), productId: product.id, type: order.type === "purchase" ? "IN" : "OUT", qty: item.qty, balance: product.stock, reference: shipment.number, order: order.number, actor: actor.name });
    }
    state.shipments.unshift(shipment);
    log(state, actor, order.type === "sale" ? "Posted delivery" : "Received goods", shipment.number, "Warehouse");
    return;
  }
  if (action.type === "issueInvoice") {
    const shipment = state.shipments.find((row) => row.id === action.shipmentId);
    requireThat(shipment, "Receipt or delivery not found.");
    requireThat(!state.invoices.some((invoice) => invoice.shipmentId === shipment.id), "An invoice already exists for this document.");
    const order = state.orders.find((row) => row.id === shipment.orderId);
    const invoice = { id: id(), number: nextNumber(state, order.type === "sale" ? "INV" : "PV"), shipmentId: shipment.id, orderId: order.id, type: order.type === "sale" ? "receivable" : "payable", date: today(), amount: shipment.total, net: shipment.net, vat: shipment.vat };
    state.invoices.unshift(invoice);
    log(state, actor, order.type === "sale" ? "Issued sales invoice" : "Issued payable voucher", invoice.number, "Finance");
    return;
  }
  if (action.type === "pay") {
    const invoice = state.invoices.find((row) => row.id === action.invoiceId);
    requireThat(invoice, "Invoice not found.");
    const amount = round(Number(action.amount));
    requireThat(Number.isFinite(amount) && amount > 0 && amount <= invoiceBalance(state, invoice), "Payment must be greater than zero and no more than the outstanding balance.");
    requireThat(["Bank transfer", "Cash", "Check"].includes(action.method), "Choose a valid payment method.");
    requireThat(String(action.reference || "").trim().length > 0, "Enter a payment reference.");
    const payment = { id: id(), number: nextNumber(state, "PAY"), invoiceId: invoice.id, amount, method: action.method, reference: String(action.reference).trim().slice(0, 120), date: today() };
    state.payments.unshift(payment);
    log(state, actor, invoice.type === "receivable" ? "Recorded collection" : "Paid supplier", `${payment.number} / ${invoice.number}`, "Finance");
    return;
  }
  if (action.type === "saveMaster") {
    requireThat(["customers", "suppliers", "products", "users"].includes(action.collection), "Invalid record type.");
    requireThat(action.collection !== "users" || actor.role === "Admin", "Only the Admin account can manage users.");
    const input = action.record;
    const collection = state[action.collection];
    const previous = input.id ? collection.find((row) => row.id === input.id) : null;
    requireThat(!input.id || previous, "Record not found.");
    requireThat(String(input.name || "").trim().length >= 2, "Enter a name with at least two characters.");
    let record = { id: previous?.id || id(), name: String(input.name).trim().slice(0, 120) };
    if (action.collection === "products") {
      requireThat(String(input.sku || "").trim(), "Enter a product SKU.");
      requireThat(!collection.some((row) => row.sku.toLowerCase() === input.sku.trim().toLowerCase() && row.id !== previous?.id), "This SKU already exists.");
      for (const field of ["price", "cost", "minimum"]) requireThat(Number.isFinite(Number(input[field])) && Number(input[field]) >= 0, `Enter a valid ${field}.`);
      requireThat(Number.isInteger(Number(input.minimum)), "The reorder level must be a whole number.");
      record = { ...record, sku: input.sku.trim(), category: String(input.category || "General"), unit: String(input.unit || "unit"), price: round(input.price), cost: round(input.cost), stock: previous?.stock || 0, minimum: Number(input.minimum) };
    } else {
      requireThat(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email || ""), "Enter a valid email address.");
      record.email = String(input.email).trim().toLowerCase();
      if (action.collection === "users") {
        requireThat(["Admin", "Operations", "Viewer"].includes(input.role), "Choose a valid role.");
        requireThat(!collection.some((row) => row.email === record.email && row.id !== previous?.id), "This email is already used.");
        requireThat(!previous || previous.id !== actor.id || input.role === "Admin", "Keep your current account as Admin.");
        record = { ...record, role: input.role, department: String(input.department || "Operations"), password: previous?.password || DEMO_PASSWORD };
      } else record = { ...record, contact: String(input.contact || ""), phone: String(input.phone || ""), address: String(input.address || ""), terms: String(input.terms || "Net 30") };
    }
    if (previous) collection[collection.indexOf(previous)] = record;
    else collection.unshift(record);
    log(state, actor, previous ? "Updated record" : "Created record", record.name, action.collection);
    return;
  }
  throw new Error("Unknown action.");
}
