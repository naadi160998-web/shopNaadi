import { useState } from 'react'
import { orders as initialOrders } from '../data/mockData'
import ConfirmDialog from '../components/ConfirmDialog'
import Modal from '../components/Modal'

const STATUS_OPTIONS = ['Delivered','Processing','Pending','Cancelled']

function getOrderClass(s) {
  return `order-status ${{Delivered:'os-delivered',Processing:'os-processing',Pending:'os-pending',Cancelled:'os-cancelled'}[s]||''}`
}

const allInitial = [
  ...initialOrders,
  { id: '#10236', customer: 'Ravi P.', date: 'Apr 5', amount: 180.00, status: 'Delivered' },
  { id: '#10235', customer: 'Sneha K.', date: 'Apr 4', amount: 55.00, status: 'Processing' },
]

export default function Orders() {
  const [orders, setOrders] = useState(allInitial)
  const [confirmId, setConfirmId] = useState(null)
  const [editOrder, setEditOrder] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  const openEdit = o => { setEditOrder(o); setEditStatus(o.status) }
  const saveEdit = () => {
    setOrders(prev => prev.map(o => o.id === editOrder.id ? { ...o, status: editStatus } : o))
    setEditOrder(null)
  }
  const handleDelete = () => {
    setOrders(prev => prev.filter(o => o.id !== confirmId))
    setConfirmId(null)
  }

  const confirmOrder = orders.find(o => o.id === confirmId)

  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Orders</h1>
        <div className="topbar-actions">
          <button className="btn-outline">⬇ Export</button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginBottom:'1.25rem'}}>
        {[{label:'Total Orders',value:orders.length,icon:'🛒'},{label:'Delivered',value:orders.filter(o=>o.status==='Delivered').length,icon:'✅'},{label:'Pending',value:orders.filter(o=>o.status==='Pending').length,icon:'⏳'}].map(m=>(
          <div key={m.label} className="metric-card">
            <div style={{fontSize:24,marginBottom:6}}>{m.icon}</div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id}>
                  <td style={{color:'var(--text-light)',fontWeight:700}}>{o.id}</td>
                  <td style={{fontWeight:700}}>{o.customer}</td>
                  <td style={{color:'var(--text-light)'}}>{o.date}</td>
                  <td style={{fontWeight:800}}>${o.amount.toFixed(2)}</td>
                  <td><span className={getOrderClass(o.status)}>{o.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={()=>openEdit(o)}>✏️ Edit</button>
                      <button className="btn-danger" onClick={()=>setConfirmId(o.id)}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editOrder && (
        <Modal title={`Edit Order ${editOrder.id}`} onClose={()=>setEditOrder(null)}
          footer={<>
            <button className="btn-outline" onClick={()=>setEditOrder(null)}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save</button>
          </>}
        >
          <div className="form-group">
            <label className="form-label">Customer</label>
            <input className="form-input" value={editOrder.customer} disabled style={{opacity:.6}} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={editStatus} onChange={e=>setEditStatus(e.target.value)}>
              {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </Modal>
      )}

      {confirmId && (
        <ConfirmDialog message="Are you sure you want to delete order" name={confirmId}
          onConfirm={handleDelete} onCancel={()=>setConfirmId(null)} />
      )}
    </div>
  )
}
