import { orders } from '../data/mockData'

const invoices = orders.map((o,i)=>({...o,invoiceId:`INV-${2024+i}`,due:'Apr 30, 2026',paid:i%3!==2}))

export default function Invoices() {
  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Invoices</h1>
        <div className="topbar-actions">
          <button className="btn-outline">⬇ Export</button>
          <button className="btn-primary">＋ Create Invoice</button>
        </div>
      </div>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr><th>Invoice ID</th><th>Order</th><th>Customer</th><th>Amount</th><th>Due Date</th><th>Status</th></tr></thead>
            <tbody>
              {invoices.map(inv=>(
                <tr key={inv.invoiceId}>
                  <td style={{fontWeight:800,color:'var(--teal-deep)'}}>{inv.invoiceId}</td>
                  <td style={{color:'var(--text-light)',fontWeight:700}}>{inv.id}</td>
                  <td style={{fontWeight:700}}>{inv.customer}</td>
                  <td style={{fontWeight:800}}>${inv.amount.toFixed(2)}</td>
                  <td style={{color:'var(--text-light)'}}>{inv.due}</td>
                  <td><span className={`order-status ${inv.paid?'os-delivered':'os-pending'}`}>{inv.paid?'Paid':'Unpaid'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
