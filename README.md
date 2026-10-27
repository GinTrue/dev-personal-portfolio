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
npm run test:contact
npm run build
```

Transaction tests cover full sales and purchasing lifecycles, partial fulfillment and payments, stock validation, role permissions, rounding, persistence recovery, and transaction locks.

## Contact form email

Direct delivery uses EmailJS. Copy `.env.example` to `.env.local` and supply the service ID, template ID, and **public** key from the EmailJS dashboard. Existing local values can remain in place.

Configure the EmailJS template with:

| Template field | Value |
| --- | --- |
| To Email | `ronneldarylrontos@gmail.com` or `{{to_email}}` |
| From Name | `{{from_name}}` or `{{name}}` |
| From Email | The connected service's default email address |
| Reply-To | `{{reply_to}}` or `{{email}}` |
| Subject | `{{subject}}` or `{{title}}` |
| Message body | `{{message}}` |

The form supplies both the default Contact Us variables and these custom aliases. The recipient is always taken from the portfolio profile, while Reply-To identifies the visitor. See [EmailJS template settings](https://www.emailjs.com/docs/tutorial/creating-email-template/).

For a hosted build, configure the same three `VITE_EMAILJS_*` values in the host before building. `.env.local` is ignored by Git and will not arrive through a repository deployment. Restart Vite after changing local values, and rebuild/redeploy after changing hosted values; Vite replaces them at build time. See [Vite environment variables](https://vite.dev/guide/env-and-mode.html).

Failures retain the entered message and display an error code. In local development, **Delivery details** shows the provider's response; the browser console also records the status and reason without logging the submitted message or configuration. **Open Gmail draft** and **Use my email app** offer a way to send the same message manually. Opening a draft does not send it.

`npm run test:contact` verifies recipient/reply-to mapping, template compatibility, draft encoding, configuration checks, and provider-error handling. Browser checks can intercept the EmailJS request to verify the form without sending a real message.

### Gmail connection failure

An approved live test returned `412: Gmail_API: Invalid grant. Please reconnect your Gmail account`. This is a rejection of the Gmail authorization held by EmailJS.

Open [EmailJS Email Services](https://dashboard.emailjs.com/admin), select the existing Gmail service, reconnect its Gmail account, authorize the connection, and save/update the service. Keep the existing service ID. This requires the account owner's Google sign-in; changing frontend keys does not renew the Gmail connection. After reconnecting, verify with one contact-form submission. Local development shows this recovery action under **Delivery details** when the same error occurs.

## Resume

Profile content is in `src/data/profile.json`. Resume downloads are in `public/`.

```sh
python scripts/generate_resume.py
```

The generator requires `python-docx` and Chrome or Edge for PDF rendering. To use an existing PDF unchanged while regenerating the editable Word and HTML versions from the profile, pass `--pdf-source PATH`.
