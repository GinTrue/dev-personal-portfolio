import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Boxes, Building2, Check, CheckCircle2, ChevronRight, ClipboardList, CreditCard, Download, Eye, LayoutDashboard, LogOut, Menu, Package, Plus, Printer, RotateCcw, ShieldCheck, ShoppingBag, ShoppingCart, Trash2, Truck, Users, Wallet, X } from "lucide-react";
import { applyAction, dateLabel, DEMO_PASSWORD, invoiceBalance, invoiceStatus, loadState, money, orderStatus, partyFor, remainingItems, SESSION_KEY, STORAGE_KEY, today, totals } from "./model";
import "./rr.css";
import { Dashboard, ModulePage } from "./Modules";

const pages = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard, group: "WORKSPACE" },
  { id: "sales", label: "Sales orders", icon: ShoppingBag, group: "WORKSPACE" },
  { id: "purchasing", label: "Purchase orders", icon: ShoppingCart, group: "WORKSPACE" },
  { id: "warehouse", label: "Receiving & deliveries", icon: Truck, group: "WORKSPACE" },
  { id: "inventory", label: "Inventory", icon: Boxes, group: "WORKSPACE" },
  { id: "receivables", label: "Accounts receivable", icon: Wallet, group: "FINANCE" },
  { id: "payables", label: "Accounts payable", icon: CreditCard, group: "FINANCE" },
  { id: "customers", label: "Customers", icon: Building2, group: "DIRECTORY" },
  { id: "suppliers", label: "Suppliers", icon: Package, group: "DIRECTORY" },
  { id: "team", label: "Team & permissions", icon: Users, group: "DIRECTORY" },
  { id: "activity", label: "Activity log", icon: ClipboardList, group: "DIRECTORY" },
];
const descriptions = {
  dashboard: "A clear view of your business, from the first order to the final payment.",
  sales: "Create, approve, and follow customer orders through to delivery.",
  purchasing: "Manage supplier orders and keep your warehouse ready for what’s next.",
  warehouse: "Receive purchases and dispatch approved sales. Stock updates automatically.",
  inventory: "Your product catalog, stock levels, and every movement in between.",
  receivables: "Turn posted deliveries into invoices and record customer payments.",
  payables: "Issue vouchers for received goods and settle supplier balances.",
  customers: "The people and businesses you sell to.",
  suppliers: "Your partners for products, equipment, and supplies.",
  team: "Explore the different roles that keep a business running.",
  activity: "A traceable record of the work happening across your workspace.",
};
const statusLabels = { draft: "For approval", approved: "Approved", partial: "Partial", completed: "Completed", cancelled: "Cancelled", paid: "Paid", unpaid: "Unpaid", pending: "To issue" };
const getSession = () => { try { return sessionStorage.getItem(SESSION_KEY); } catch { return null; } };
const getPage = () => pages.some((page) => page.id === window.location.hash.slice(1)) ? window.location.hash.slice(1) : "dashboard";
const Badge = ({ status }) => <span className={`rr-badge rr-status-${status}`}>{statusLabels[status] || status}</span>;
const Brand = () => <span className="rr-brand"><span className="rr-logo">RR<span>.</span></span><span><strong>RR ERP</strong><small>BUSINESS, CONNECTED.</small></span></span>;

function Modal({ title, eyebrow = "RR ERP / DEMO WORKSPACE", onClose, children, wide = false }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={`rr-modal ${wide ? "rr-modal-wide" : ""}`} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}>
    <div className="rr-modal-heading"><div><p className="rr-eyebrow">{eyebrow}</p><h2 id={titleId}>{title}</h2></div><button className="rr-icon-btn" onClick={onClose} aria-label="Close dialog"><X size={20} /></button></div>
    {children}
  </dialog>;
}

function Login({ users, onLogin }) {
  const [email, setEmail] = useState("admin@rr.example");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const submit = (event) => { event.preventDefault(); const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password); if (user) onLogin(user); else setError("The demo email or password is incorrect. Use an account listed below."); };
  return <div className="rr-app rr-login">
    <div className="rr-login-story"><a href="/#projects" className="rr-back"><ArrowLeft size={16} /> Back to portfolio</a><Brand /><div className="rr-login-copy"><span className="rr-live"><span /> INTERACTIVE PROJECT DEMO</span><h1>One workspace.<br />The whole picture<span>.</span></h1><p>From a customer’s first order to the last payment. Explore the business flows that connect sales, purchasing, inventory, and finance.</p><div className="rr-login-flow">Sales <ChevronRight size={14} /> Delivery <ChevronRight size={14} /> Invoice <ChevronRight size={14} /> Payment</div></div><p className="rr-login-footer">BUILT BY RONNEL DARYL RONTOS <span>RR / 01</span></p></div>
    <main className="rr-login-main"><div className="rr-login-form"><span className="rr-eyebrow">YOUR WORKSPACE IS READY</span><h2>Take a look around.</h2><p>Sign in with a dummy account and try a complete transaction.</p><form onSubmit={submit}>
      <label className="rr-field">Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label className="rr-field">Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      {error && <p className="rr-form-error" role="alert">{error}</p>}<button className="rr-btn rr-btn-primary rr-full" type="submit">Enter workspace <ArrowRight size={17} /></button>
    </form><div className="rr-login-accounts"><p className="rr-eyebrow">CHOOSE A DEMO ROLE</p>{[{ email: "admin@rr.example", role: "Admin", description: "Full access · complete every transaction" }, { email: "operations@rr.example", role: "Operations", description: "Sales, warehouse, and finance" }, { email: "viewer@rr.example", role: "Viewer", description: "Explore with read-only access" }].map((account) => <button key={account.email} type="button" className={email === account.email ? "selected" : ""} onClick={() => { setEmail(account.email); setPassword(DEMO_PASSWORD); setError(""); }}><span><strong>{account.role}</strong><small>{account.description}</small><code>{account.email}</code></span>{email === account.email ? <CheckCircle2 size={18} /> : <ArrowUpRight size={18} />}</button>)}<p className="rr-demo-password">All demo accounts use <code>{DEMO_PASSWORD}</code></p></div><div className="rr-privacy"><ShieldCheck size={18} /><p>Fictional data. Changes stay in this browser. Reset the workspace whenever you want a fresh start.</p></div></div></main>
  </div>;
}

function OrderForm({ state, order, type, onSave, onClose, error }) {
  const [form, setForm] = useState(() => order ? structuredClone(order) : { type, partyId: "", date: today(), vat: "inclusive", discount: 0, remarks: "", status: "draft", items: [{ productId: state.products[0]?.id || "", qty: 1, price: type === "sale" ? state.products[0]?.price || 0 : state.products[0]?.cost || 0 }] });
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const updateItem = (index, field, value) => setForm((current) => ({ ...current, items: current.items.map((item, i) => i === index ? { ...item, [field]: value, ...(field === "productId" ? { price: state.products.find((product) => product.id === value)?.[type === "sale" ? "price" : "cost"] || 0 } : {}) } : item) }));
  const computed = totals(form);
  const party = partyFor(state, form);
  return <form className="rr-form" onSubmit={(event) => { event.preventDefault(); onSave({ ...form, status: event.nativeEvent.submitter?.value === "approved" ? "approved" : "draft" }); }}>
    <div className="rr-form-grid"><label className="rr-field">{type === "sale" ? "Customer" : "Supplier"}<select required value={form.partyId} onChange={(event) => update("partyId", event.target.value)}><option value="">Select a {type === "sale" ? "customer" : "supplier"}</option>{state[type === "sale" ? "customers" : "suppliers"].map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label className="rr-field">Order date<input type="date" required value={form.date} onChange={(event) => update("date", event.target.value)} /></label><label className="rr-field">VAT treatment<select value={form.vat} onChange={(event) => update("vat", event.target.value)}><option value="inclusive">VAT inclusive · 12%</option><option value="exclusive">VAT exclusive · 12%</option><option value="zero">Zero rated</option></select></label><div className="rr-party-note"><span>CONTACT & TERMS</span><p>{party ? `${party.contact} · ${party.terms}` : "Choose a business to see its contact details."}</p></div></div>
    <div className="rr-form-subheading"><h3>Line items</h3><span>Prices in Philippine pesos</span></div><div className="rr-line-scroll"><div className="rr-line-header"><span>PRODUCT</span><span>QTY</span><span>UNIT PRICE</span><span>AMOUNT</span><span /></div>{form.items.map((item, index) => <div className="rr-line-item" key={index}><select aria-label={`Product ${index + 1}`} required value={item.productId} onChange={(event) => updateItem(index, "productId", event.target.value)}>{state.products.map((product) => <option key={product.id} value={product.id}>{product.name} ({product.stock} in stock)</option>)}</select><input aria-label={`Quantity ${index + 1}`} type="number" min="1" max="100000" step="1" required value={item.qty} onChange={(event) => updateItem(index, "qty", event.target.value)} /><input aria-label={`Unit price ${index + 1}`} type="number" min="0" max="100000000" step="0.01" required value={item.price} onChange={(event) => updateItem(index, "price", event.target.value)} /><span>{money(Number(item.qty) * Number(item.price))}</span><button type="button" className="rr-icon-btn" disabled={form.items.length === 1} aria-label={`Remove item ${index + 1}`} onClick={() => update("items", form.items.filter((_, i) => i !== index))}><Trash2 size={16} /></button></div>)}</div><button type="button" className="rr-btn rr-btn-subtle" onClick={() => update("items", [...form.items, { productId: state.products.find((product) => !form.items.some((item) => item.productId === product.id))?.id || state.products[0].id, qty: 1, price: 0 }])}><Plus size={15} /> Add line item</button>
    <div className="rr-form-bottom"><div><label className="rr-field">Notes<textarea rows="3" maxLength={2000} value={form.remarks} onChange={(event) => update("remarks", event.target.value)} placeholder="Delivery instructions, project details, or a note for your team" /></label><label className="rr-field">Discount (PHP)<input type="number" step="0.01" min="0" max={computed.subtotal || 0} value={form.discount} onChange={(event) => update("discount", event.target.value)} /></label></div><Amounts computed={computed} /></div>
    {error && <p className="rr-form-error" role="alert">{error}</p>}<div className="rr-form-actions"><button type="button" className="rr-btn" onClick={onClose}>Cancel</button><button className="rr-btn" name="status" value="draft">Save for approval</button><button className="rr-btn rr-btn-primary" name="status" value="approved">Save & approve <Check size={16} /></button></div>
  </form>;
}

function Amounts({ computed }) {
  return <dl className="rr-amounts"><div><dt>Subtotal</dt><dd>{money(computed.subtotal ?? computed.net + computed.vat)}</dd></div>{computed.discount > 0 && <div><dt>Discount</dt><dd>−{money(computed.discount)}</dd></div>}<div><dt>Net amount</dt><dd>{money(computed.net)}</dd></div><div><dt>VAT</dt><dd>{money(computed.vat)}</dd></div><div className="rr-grand-total"><dt>Total</dt><dd>{money(computed.total)}</dd></div></dl>;
}

function FulfillmentForm({ state, order, onSave, onClose, error }) {
  const remaining = remainingItems(state, order);
  const [quantities, setQuantities] = useState(() => Object.fromEntries(remaining.map((item) => [item.productId, item.remaining])));
  const [reference, setReference] = useState("");
  const sale = order.type === "sale";
  return <form className="rr-form" onSubmit={(event) => { event.preventDefault(); onSave({ type: "fulfill", orderId: order.id, items: remaining.map((item) => ({ productId: item.productId, qty: Number(quantities[item.productId]) })), reference }); }}><div className="rr-info-strip"><Truck size={19} /><p>{sale ? "Posting a delivery deducts stock and makes the delivery available for invoicing." : "Receiving goods adds stock and makes this receipt available for a payable voucher."} Partial quantities are supported.</p></div><div className="rr-table-scroll"><table className="rr-table"><thead><tr><th>Product</th><th>Remaining</th><th>In stock</th><th>{sale ? "Dispatch" : "Receive"}</th></tr></thead><tbody>{remaining.map((item) => { const product = state.products.find((row) => row.id === item.productId); return <tr key={item.productId}><td><strong>{product.name}</strong><small>{product.sku}</small></td><td>{item.remaining}</td><td>{product.stock}</td><td><input aria-label={`Quantity for ${product.name}`} type="number" min="0" max={item.remaining} step="1" required value={quantities[item.productId]} onChange={(event) => setQuantities({ ...quantities, [item.productId]: event.target.value })} /></td></tr>; })}</tbody></table></div><label className="rr-field">Reference / delivery note<input maxLength={120} value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Optional supplier reference or dispatch note" /></label>{error && <p className="rr-form-error" role="alert">{error}</p>}<div className="rr-form-actions"><button className="rr-btn" type="button" onClick={onClose}>Cancel</button><button className="rr-btn rr-btn-primary">{sale ? "Post delivery" : "Receive goods"}<Check size={16} /></button></div></form>;
}

function PaymentForm({ state, invoice, onSave, onClose, error }) {
  const [amount, setAmount] = useState(invoiceBalance(state, invoice));
  const [method, setMethod] = useState("Bank transfer");
  const [reference, setReference] = useState("");
  return <form className="rr-form" onSubmit={(event) => { event.preventDefault(); onSave({ type: "pay", invoiceId: invoice.id, amount, method, reference }); }}><div className="rr-payment-balance"><span>Outstanding on {invoice.number}</span><strong>{money(invoiceBalance(state, invoice))}</strong></div><div className="rr-form-grid"><label className="rr-field">Payment amount<input type="number" min="0.01" max={invoiceBalance(state, invoice)} step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} /></label><label className="rr-field">Payment method<select value={method} onChange={(event) => setMethod(event.target.value)}>{["Bank transfer", "Cash", "Check"].map((option) => <option key={option}>{option}</option>)}</select></label></div><label className="rr-field">Payment reference<input required maxLength={120} value={reference} onChange={(event) => setReference(event.target.value)} placeholder="e.g. DEMO-TRANSFER-001" /></label><p className="rr-helper">You can record a partial payment and settle the remaining balance later.</p>{error && <p className="rr-form-error" role="alert">{error}</p>}<div className="rr-form-actions"><button className="rr-btn" type="button" onClick={onClose}>Cancel</button><button className="rr-btn rr-btn-primary">{invoice.type === "receivable" ? "Record collection" : "Record supplier payment"}<Check size={16} /></button></div></form>;
}

function MasterForm({ collection, record, onSave, onClose, error }) {
  const [form, setForm] = useState(() => record || { name: "", email: "", contact: "", phone: "", address: "", terms: "Net 30", sku: "", category: "General", unit: "unit", price: 0, cost: 0, minimum: 5, role: "Operations", department: "Operations" });
  const field = (key, title, type = "text", required = true) => <label className="rr-field" key={key}>{title}<input type={type} required={required} min={type === "number" ? "0" : undefined} step={type === "number" && key !== "minimum" ? ".01" : undefined} maxLength={type === "number" ? undefined : 120} value={form[key] ?? ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>;
  return <form className="rr-form" onSubmit={(event) => { event.preventDefault(); onSave({ type: "saveMaster", collection, record: form }); }}><div className="rr-form-grid">{field("name", collection === "products" ? "Product name" : "Name")}{collection === "products" ? <>{field("sku", "SKU")}{field("category", "Category")}{field("unit", "Unit of measure")}{field("price", "Sales price (PHP)", "number")}{field("cost", "Cost price (PHP)", "number")}{field("minimum", "Reorder level", "number")}</> : <>{field("email", "Email address", "email")}{collection === "users" ? <><label className="rr-field">Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>{["Admin", "Operations", "Viewer"].map((role) => <option key={role}>{role}</option>)}</select></label>{field("department", "Department")}</> : <>{field("contact", "Contact person")}{field("phone", "Phone", "tel", false)}{field("address", "Address", "text", false)}<label className="rr-field">Payment terms<select value={form.terms} onChange={(event) => setForm({ ...form, terms: event.target.value })}>{["Net 30", "Net 15", "Cash on delivery"].map((term) => <option key={term}>{term}</option>)}</select></label></>}</>}</div>{collection === "products" && <p className="rr-helper">New products start with zero stock. Create and receive a purchase order to add stock.</p>}{collection === "users" && <p className="rr-helper">New dummy accounts use <code>{DEMO_PASSWORD}</code>. They only access this browser’s demo workspace.</p>}{error && <p className="rr-form-error" role="alert">{error}</p>}<div className="rr-form-actions"><button className="rr-btn" type="button" onClick={onClose}>Cancel</button><button className="rr-btn rr-btn-primary">Save record <Check size={16} /></button></div></form>;
}

function OrderDetail({ state, order, canWrite, open, commit }) {
  const status = orderStatus(state, order);
  const shipments = state.shipments.filter((shipment) => shipment.orderId === order.id);
  const invoices = state.invoices.filter((invoice) => invoice.orderId === order.id);
  const steps = [order.status === "approved", status === "completed", invoices.length > 0, invoices.length > 0 && invoices.every((invoice) => invoiceBalance(state, invoice) === 0)];
  return <div className="rr-form"><div className="rr-detail-meta"><div><span>{order.type === "sale" ? "CUSTOMER" : "SUPPLIER"}</span><h3>{partyFor(state, order)?.name}</h3><p>{dateLabel(order.date)} · {partyFor(state, order)?.terms}</p></div><Badge status={status} /></div><div className="rr-steps">{["Approved", order.type === "sale" ? "Delivered" : "Received", "Invoiced", "Paid"].map((label, index) => <span key={label} className={steps[index] ? "complete" : ""}>{steps[index] ? <CheckCircle2 size={16} /> : <span className="rr-step-number">{index + 1}</span>}{label}</span>)}</div><LineTable state={state} items={order.items} /><div className="rr-form-bottom"><p className="rr-detail-note">{order.remarks || "No additional notes."}</p><Amounts computed={totals(order)} /></div>{shipments.length > 0 && <div className="rr-linked-docs"><h3>Linked documents</h3>{shipments.map((shipment) => { const invoice = invoices.find((item) => item.shipmentId === shipment.id); return <div key={shipment.id}><span><Truck size={15} /> {shipment.number}</span><span>{invoice ? invoice.number : "Ready to invoice"}</span><strong>{money(shipment.total)}</strong>{invoice ? <button className="rr-link" onClick={() => open({ kind: "invoice", id: invoice.id })}>View invoice <ChevronRight size={14} /></button> : canWrite && <button className="rr-link" onClick={() => commit({ type: "issueInvoice", shipmentId: shipment.id }, "Invoice issued.")}>Issue {order.type === "sale" ? "invoice" : "voucher"}<ChevronRight size={14} /></button>}</div>; })}</div>}<div className="rr-form-actions">{canWrite && order.status === "draft" && <><button className="rr-btn" onClick={() => open({ kind: "orderForm", type: order.type, id: order.id })}>Edit draft</button><button className="rr-btn rr-btn-primary" onClick={() => commit({ type: "approve", orderId: order.id }, "Order approved. Ready for warehouse processing.")}>Approve order <Check size={16} /></button></>}{canWrite && order.status === "approved" && status !== "completed" && <button className="rr-btn rr-btn-primary" onClick={() => open({ kind: "fulfill", id: order.id })}>{order.type === "sale" ? "Post delivery" : "Receive goods"}<Truck size={16} /></button>}{canWrite && ["draft", "approved"].includes(order.status) && shipments.length === 0 && <button className="rr-btn rr-btn-danger" onClick={() => open({ kind: "cancel", id: order.id })}>Cancel order</button>}</div></div>;
}

function LineTable({ state, items }) {
  return <div className="rr-table-scroll"><table className="rr-table"><thead><tr><th>Product / description</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>{items.map((item) => { const product = state.products.find((row) => row.id === item.productId); return <tr key={item.productId}><td><strong>{product?.name}</strong><small>{product?.sku}</small></td><td>{item.qty} {product?.unit}</td><td>{money(item.price)}</td><td className="rr-amount-cell">{money(item.qty * item.price)}</td></tr>; })}</tbody></table></div>;
}

function InvoiceDetail({ state, invoice, canWrite, open }) {
  const order = state.orders.find((row) => row.id === invoice.orderId);
  const shipment = state.shipments.find((row) => row.id === invoice.shipmentId);
  const party = partyFor(state, order);
  const payments = state.payments.filter((payment) => payment.invoiceId === invoice.id);
  return <div className="rr-form rr-document"><div className="rr-document-top"><Brand /><div><span>{invoice.type === "receivable" ? "SALES INVOICE" : "PAYABLE VOUCHER"}</span><strong>{invoice.number}</strong><small>DEMO DOCUMENT · {dateLabel(invoice.date)}</small></div></div><div className="rr-detail-meta"><div><span>{invoice.type === "receivable" ? "BILL TO" : "SUPPLIER"}</span><h3>{party.name}</h3><p>{party.address}</p><p>{party.email}</p></div><div><Badge status={invoiceStatus(state, invoice)} /><p>{order.number} / {shipment.number}</p></div></div><LineTable state={state} items={shipment.items} /><div className="rr-form-bottom"><p className="rr-detail-note">Fictional transaction in the RR ERP portfolio demo.</p><Amounts computed={{ net: invoice.net, vat: invoice.vat, total: invoice.amount }} /></div><div className="rr-payment-balance"><span>Outstanding balance</span><strong>{money(invoiceBalance(state, invoice))}</strong></div>{payments.length > 0 && <div className="rr-linked-docs"><h3>Payment history</h3>{payments.map((payment) => <div key={payment.id}><span>{payment.number}</span><span>{payment.method} · {payment.reference}</span><strong>{money(payment.amount)}</strong><small>{dateLabel(payment.date)}</small></div>)}</div>}<div className="rr-form-actions rr-no-print"><button className="rr-btn" onClick={() => window.print()}><Printer size={16} /> Print document</button>{canWrite && invoiceBalance(state, invoice) > 0 && <button className="rr-btn rr-btn-primary" onClick={() => open({ kind: "payment", id: invoice.id })}>Record payment <CreditCard size={16} /></button>}</div></div>;
}

export default function RrDemo() {
  const [state, setState] = useState(loadState);
  const [userId, setUserId] = useState(getSession);
  const [page, setPage] = useState(getPage);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const user = state.users.find((item) => item.id === userId);
  const canWrite = user?.role !== "Viewer";
  const activePage = pages.find((item) => item.id === page) || pages[0];
  useEffect(() => { const previous = document.title; document.title = "RR ERP — Interactive Demo"; return () => { document.title = previous; }; }, []);
  useEffect(() => { const handle = () => { setPage(getPage()); setSearch(""); setStatusFilter("all"); setMobileNav(false); }; window.addEventListener("hashchange", handle); return () => window.removeEventListener("hashchange", handle); }, []);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(""), 6000); return () => window.clearTimeout(timer); }, [notice]);
  useEffect(() => {
    if (!mobileNav) return;
    const sidebar = document.querySelector(".rr-sidebar");
    const previous = document.activeElement;
    const items = [...sidebar.querySelectorAll("a, button")];
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    items[0]?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") setMobileNav(false);
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = overflow; previous?.focus(); };
  }, [mobileNav]);
  const save = (next) => { setState(next); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageFailed(false); } catch { setStorageFailed(true); } };
  const open = (value) => { setError(""); setModal(value); };
  const close = () => { setModal(null); setError(""); };
  const navigate = (value) => { setPage(value); setSearch(""); setStatusFilter("all"); setMobileNav(false); window.location.hash = value; };
  const commit = (action, message) => { try { const next = applyAction(state, userId, action); save(next); close(); setNotice(message || "Changes saved."); if (action.type === "saveOrder") open({ kind: "order", id: action.order.id || next.orders[0].id }); } catch (exception) { setError(exception.message); if (!modal) setNotice(exception.message); } };
  const login = (account) => { setUserId(account.id); try { sessionStorage.setItem(SESSION_KEY, account.id); } catch { /* Login still works without session storage. */ } setNotice(`Welcome, ${account.name.split(" ")[0]}. This is your demo workspace.`); };
  const logout = () => { setMobileNav(false); setUserId(null); try { sessionStorage.removeItem(SESSION_KEY); } catch { /* In-memory session is cleared above. */ } close(); };
  const exportCsv = () => {
    const rows = [["Reference", "Type", "Date", "Business", "Status", "Total PHP"], ...state.orders.map((order) => [order.number, order.type, order.date, partyFor(state, order)?.name, orderStatus(state, order), totals(order).total])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""').replace(/^[=+\-@]/, "'$&")}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "RR-ERP-transactions.csv"; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  if (!user) return <Login users={state.users} onLogin={login} />;
  const order = modal?.id ? state.orders.find((row) => row.id === modal.id) : null;
  const invoice = modal?.id ? state.invoices.find((row) => row.id === modal.id) : null;
  const modalTitles = { order: order?.number, orderForm: `${modal?.id ? "Edit" : "New"} ${modal?.type === "sale" ? "sales" : "purchase"} order`, fulfill: `${order?.type === "sale" ? "Post delivery" : "Receive goods"} · ${order?.number}`, invoice: invoice?.number, payment: "Record a payment", master: `${modal?.id ? "Edit" : "New"} ${modal?.collection === "users" ? "team member" : modal?.collection?.replace(/s$/, "")}`, cancel: "Cancel this order?", reset: "Start with a fresh workspace?" };
  return <div className="rr-app rr-workspace">
    <a className="rr-skip" href="#rr-main" onClick={(event) => { event.preventDefault(); document.getElementById("rr-main")?.focus(); }}>Skip to workspace</a>
    {mobileNav && <button className="rr-nav-backdrop" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <aside className={`rr-sidebar ${mobileNav ? "rr-nav-open" : ""}`} aria-label="ERP navigation"><a href="?demo=rr#dashboard" className="rr-sidebar-brand" onClick={(event) => { event.preventDefault(); navigate("dashboard"); }}><Brand /></a><div className="rr-workspace-name"><span>R</span><div><strong>RR Demo Company</strong><small>Personal demo workspace</small></div><span className="rr-green-dot" /></div><nav>{pages.map((item, index) => <div key={item.id}>{pages[index - 1]?.group !== item.group && <p className="rr-nav-group">{item.group}</p>}<a href={`#${item.id}`} onClick={(event) => { event.preventDefault(); navigate(item.id); }} aria-current={page === item.id ? "page" : undefined} className={page === item.id ? "active" : ""}><item.icon size={20} /><span>{item.label}</span>{item.id === "sales" && <span className="rr-nav-count">{state.orders.filter((record) => record.type === "sale" && record.status === "draft").length}</span>}</a></div>)}</nav><div className="rr-sidebar-bottom"><a href="/#projects"><ArrowLeft size={16} /> Back to portfolio</a><button onClick={logout}><LogOut size={16} /> Sign out</button><span>RR ERP <b>DEMO / V1.0</b></span></div></aside>
    <div className="rr-workspace-content"><header className="rr-topbar"><div><button className="rr-icon-btn rr-nav-toggle" onClick={() => setMobileNav(!mobileNav)} aria-expanded={mobileNav} aria-label="Toggle navigation"><Menu size={21} /></button><span className="rr-breadcrumb"><span className="rr-breadcrumb-root">Workspace</span><ChevronRight size={13} /> <strong>{activePage.label}</strong></span></div><div><span className="rr-demo-pill"><span /> DEMO MODE</span><button className="rr-user" onClick={() => navigate("team")}><span className="rr-avatar">{user.name.split(" ").map((part) => part[0]).join("")}</span><span><strong>{user.name}</strong><small>{user.role}</small></span></button></div></header>
      <div className="rr-demo-banner"><span><ShieldCheck size={15} /> Fictional data · {storageFailed ? "Changes are in memory only; browser storage is unavailable." : "Your changes are saved only in this browser."}</span><button onClick={() => open({ kind: "reset" })}><RotateCcw size={13} /> Reset demo</button></div>
      <main className="rr-main" id="rr-main" tabIndex={-1}><div className="rr-page-heading"><div><p className="rr-eyebrow">RR / {activePage.group}</p><h1>{page === "dashboard" ? "Business at a glance." : activePage.label}</h1><p>{descriptions[page]}</p></div><div>{page === "dashboard" && <button className="rr-btn" onClick={exportCsv}><Download size={15} /> Export transactions</button>}{canWrite && ["sales", "purchasing"].includes(page) && <button className="rr-btn rr-btn-primary" onClick={() => open({ kind: "orderForm", type: page === "sales" ? "sale" : "purchase" })}><Plus size={16} /> New {page === "sales" ? "sales" : "purchase"} order</button>}{canWrite && ["customers", "suppliers", "inventory"].includes(page) && <button className="rr-btn rr-btn-primary" onClick={() => open({ kind: "master", collection: page === "inventory" ? "products" : page })}><Plus size={16} /> Add {page === "inventory" ? "product" : page === "customers" ? "customer" : "supplier"}</button>}{page === "team" && user.role === "Admin" && <button className="rr-btn rr-btn-primary" onClick={() => open({ kind: "master", collection: "users" })}><Plus size={16} /> Add dummy account</button>}</div></div>
        {user.role === "Viewer" && <div className="rr-readonly"><Eye size={16} /> You’re exploring as Viewer. Sign in as Admin or Operations to create and process transactions.</div>}
        {page === "dashboard" ? <Dashboard state={state} navigate={navigate} open={open} canWrite={canWrite} /> : <ModulePage state={state} page={page} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} user={user} canWrite={canWrite} open={open} commit={commit} />}
      </main><footer className="rr-workspace-footer"><span>RR ERP / A project by Ronnel Daryl Rontos</span><span>All records in this workspace are fictional.</span></footer>
    </div>
    {notice && <div className="rr-toast" role="status"><CheckCircle2 size={18} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={15} /></button></div>}
    {modal && <Modal key={`${modal.kind}-${modal.id || modal.collection || ""}`} title={modalTitles[modal.kind]} onClose={close} wide={["order", "orderForm", "fulfill", "invoice"].includes(modal.kind)}>
      {modal.kind === "orderForm" && <OrderForm state={state} order={order} type={modal.type} onSave={(value) => commit({ type: "saveOrder", order: value }, "Order saved.")} onClose={close} error={error} />}
      {modal.kind === "order" && order && <OrderDetail state={state} order={order} canWrite={canWrite} open={open} commit={commit} />}
      {modal.kind === "fulfill" && order && <FulfillmentForm state={state} order={order} onSave={(action) => commit(action, "Warehouse transaction posted. Inventory updated.")} onClose={close} error={error} />}
      {modal.kind === "invoice" && invoice && <InvoiceDetail state={state} invoice={invoice} canWrite={canWrite} open={open} />}
      {modal.kind === "payment" && invoice && <PaymentForm state={state} invoice={invoice} onSave={(action) => commit(action, "Payment recorded. Outstanding balance updated.")} onClose={close} error={error} />}
      {modal.kind === "master" && <MasterForm collection={modal.collection} record={state[modal.collection].find((record) => record.id === modal.id)} onSave={(action) => commit(action, "Record saved.")} onClose={close} error={error} />}
      {modal.kind === "cancel" && <div className="rr-form"><p>Cancel {order?.number}? No stock or payment has been posted for this order. The cancelled record stays in the activity history.</p>{error && <p className="rr-form-error" role="alert">{error}</p>}<div className="rr-form-actions"><button className="rr-btn" onClick={close}>Keep order</button><button className="rr-btn rr-btn-danger" onClick={() => commit({ type: "cancel", orderId: modal.id }, "Order cancelled.")}>Cancel order</button></div></div>}
      {modal.kind === "reset" && <div className="rr-form"><p>This clears transactions and new records in this browser and restores the original dummy data. Other visitors’ workspaces are unaffected.</p><div className="rr-form-actions"><button className="rr-btn" onClick={close}>Keep exploring</button><button className="rr-btn rr-btn-primary" onClick={() => { try { localStorage.removeItem(STORAGE_KEY); } catch { /* Reset can also restore in-memory data. */ } save(loadState({ getItem: () => null })); close(); logout(); navigate("dashboard"); }}>Reset workspace <RotateCcw size={15} /></button></div></div>}
      {error && ["order", "invoice"].includes(modal.kind) && <p className="rr-form-error rr-dialog-error" role="alert">{error}</p>}
    </Modal>}
  </div>;
}
