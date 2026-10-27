# Ronnel Daryl Rontos — Portfolio

React + Vite portfolio with an interactive **RR ERP** demo.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Use **Try RR ERP** in the hero or **Launch RR ERP** in the featured project. The demo lives at `/?demo=rr`, so it works on a static host without additional server routes.

## RR ERP demo accounts

All three accounts use the password `RRdemo2026!`.

| Email | Role | Access |
| --- | --- | --- |
| admin@rr.example | Admin | All transactions, master records, and dummy account management |
| operations@rr.example | Operations | Sales, purchasing, receiving, deliveries, finance, and master records |
| viewer@rr.example | Viewer | Read-only access to all modules |

The demo adapts the workflows reviewed in the existing local Laravel ERP. It runs in the browser with fictional companies, products, accounts, and documents. It does not connect to the original application, database, email, or payment services. Demo role checks demonstrate the interface; they are not production authentication.

Each browser keeps its own transactions in `localStorage`; sign-in lasts for the browser tab through `sessionStorage`. **Reset demo** restores the starting records and signs out. If browser storage is unavailable, the demo still runs in memory.

### Complete a transaction

1. Create a sales order and save it for approval, or choose **Save & approve**.
2. Approve the order. Approved orders are locked against editing.
3. Open **Receiving & deliveries** and dispatch all or part of the order. This deducts stock and creates a delivery document.
4. Open **Accounts receivable** and issue an invoice for the posted delivery.
5. Record one or more payments until the balance is settled. Open the invoice to see its payment history or print the demo document.

Purchasing follows the parallel path: purchase order → approval → goods receipt → payable voucher → supplier payment. Receiving increases stock; delivery reduces stock. The demo rejects duplicate invoice issuance, overpayments, over-receiving, and shipments with insufficient stock. Every mutation records an activity entry.

The dashboard can export orders as CSV. Customers, suppliers, products, and dummy accounts can be created and edited. New products start with no stock and must be replenished through purchasing.

## Checks

```sh
npm run test:rr
npm run build
```

Transaction tests cover full sales and purchasing lifecycles, partial fulfillment and payments, stock validation, role permissions, rounding, persistence recovery, and transaction locks.

## Resume

Profile content is in `src/data/profile.json`. Resume downloads are in `public/`.

```sh
python scripts/generate_resume.py
```

The generator requires `python-docx` and Chrome or Edge for PDF rendering. To use an existing PDF unchanged while regenerating the editable Word and HTML versions from the profile, pass `--pdf-source PATH`.
