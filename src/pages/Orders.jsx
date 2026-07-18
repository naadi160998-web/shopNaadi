import { useEffect, useState } from 'react'
import { orders as initialOrders } from '../data/mockData'
import ConfirmDialog from '../components/ConfirmDialog'
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders,createOrders } from '../services/orderApi'

const STATUS_OPTIONS = ['Delivered','Processing','Pending','Cancelled']

function getOrderClass(s) {
  return `order-status ${{Delivered:'os-delivered',Processing:'os-processing',Pending:'os-pending',Cancelled:'os-cancelled'}[s]||''}`
}

// const allInitial = [
//   ...initialOrders,
//   { id: '#10236', customer: 'Ravi P.', date: 'Apr 5', amount: 180.00, status: 'Delivered' },
//   { id: '#10235', customer: 'Sneha K.', date: 'Apr 4', amount: 55.00, status: 'Processing' },
// ]

const paymentType = ['Pending','Confirmed','Packed','Shipped','Delivered','Cancelled']

const emptyForm = {
  product_id: "",
  warehouse_id:"",
  customer_id:"",
  order_number:0,
  total_amount:0,
  qty: 0,
  status:"Pending",
  date:"",
}

export default function Orders() {

  const orderDatas = useSelector(state => state.orders.orderData)
  const productDatas = useSelector(state => state.products.productsData)
  const customerDatas = useSelector(state => state.customers.customerData)
  const warehouseData = useSelector(state => state.warehouses.warehouseData)
  // console.log("orderDatas:",customerDatas);

  const dispatch = useDispatch()

  const [orders, setOrders] = useState(orderDatas)
  const [confirmId, setConfirmId] = useState(null)
  const [editOrder, setEditOrder] = useState(null)
  const [editStatus, setEditStatus] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openModel = w => {
    setForm(emptyForm);
    setModal('add');
  }
  const closeModal = () => { setModal(null); }

  // const openEdit = o => { setEditOrder(o); setEditStatus(o.status) }
  // const saveEdit = () => {
  //   setOrders(prev => prev.map(o => o.id === editOrder.id ? { ...o, status: editStatus } : o))
  //   setEditOrder(null)
  // }
  // const handleDelete = () => {
  //   setOrders(prev => prev.filter(o => o.id !== confirmId))
  //   setConfirmId(null)
  // }

  // const confirmOrder = orders.find(o => o.id === confirmId)

  const handleSave = () => {
      if (modal === 'add') {
        // update input fields
        // console.log("form:",form);
        form.product_id = parseInt(form.product_id)
        form.customer_id = parseInt(form.customer_id)
        form.warehouse_id = parseInt(form.warehouse_id)
        form.qty = parseInt(form.qty)
        form.total_amount = parseInt(form.total_amount)
        form.order_number = `ORD${orderDatas.length+1}`
        form.date = form.date.split("-").reverse().join("/")
        console.log("form:",form);
        // setWarehouses(prev => [...prev, { warehouse_id: editId, ...form}])
        // setNextId(n => n + 1)
        createOrders(form).then(res => {
          // if (res.status === 201) {
          //   closeModal()
          // }
        })
      }
    }

  useEffect(()=>{
    dispatch(getOrders())
  },[dispatch])

  function customerName(customer_id) {
      const customer = customerDatas.filter(c => c.customer_id === customer_id)
      return customer[0].customer_name
  }

  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Orders</h1>
        <div className="topbar-actions">
          <button className="btn-outline">⬇ Export</button>
          <button className="btn-primary" onClick={() => openModel()}>＋ orders</button>
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
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((o,i)=>(
                <tr key={i}>
                  <td style={{color:'var(--text-light)',fontWeight:700}}>{o.order_number}</td>
                  <td style={{fontWeight:700}}>{customerName(o.customer_id)}</td>
                  <td style={{color:'var(--text-light)'}}>{o.date}</td>
                  <td style={{fontWeight:800}}>${o.total_amount}</td>
                  <td><span className={getOrderClass(o.status)}>{o.status}</span></td>
                  {/* <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={()=>openEdit(o)}>✏️ Edit</button>
                      <button className="btn-danger" onClick={()=>setConfirmId(o.id)}>🗑 Delete</button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add New Warehouse' : 'Edit Warehouse'}
          onClose={closeModal}
          footer={<>
            <button className="btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>{modal !== 'add' ? "update" : "add"
            }</button>
          </>}
        >
          <div>
            <div className="form-group">
              <label className="form-label">Product</label>
              <select className="form-select" value={form.product_id} onChange={e => setForm(f => ({...f,product_id:e.target.value}))}>
                <option value={null}>Select products</option>
                {
                  productDatas.map((p, i) => (
                    <option key={i} value={p.product_id}>{p.product_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <select className="form-select" value={form.warehouse_id} onChange={e => setForm(f => ({...f,warehouse_id:e.target.value}))}>
                <option value={null}>Select Warehouses</option>
                {
                  warehouseData.map((w, i) => (
                    <option key={i} value={w.warehouse_id}>{`${w.warehouse_name}-[${w.city.slice(0, 2)}]`}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Customers</label>
              <select className="form-select" value={form.customer_id} onChange={e => setForm(f => ({...f,customer_id:e.target.value}))}>
                <option value={null}>Select customers</option>
                {
                  customerDatas.map((c, i) => (
                    <option key={i} value={c.customer_id}>{c.customer_name}</option>
                  ))
                }
              </select>
            </div>
            {/* <div className="form-group">
              <label className="form-label">Order No</label>
              <input className="form-input" placeholder="0" value={form.order_number}
                onChange={e => setForm(f => ({ ...f, order_number: e.target.value }))} />
            </div> */}
            <div className="form-group">
              <label className="form-label">Product Quantity</label>
              <input className="form-input" placeholder="0" value={form.qty}
                onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">total_amount</label>
              <input className="form-input" placeholder="0" value={form.total_amount}
                onChange={e => setForm(f => ({ ...f, total_amount: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Type</label>
              <select className="form-select" value={form.status} onChange={e => setForm(f => ({...f,status:e.target.value}))}>
                <option value={null}>Select payment</option>
                {
                  paymentType.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type='date' placeholder="0" value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
          </div>
        </Modal>
      )}

      {/* {editOrder && (
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
      )} */}

      {confirmId && (
        <ConfirmDialog message="Are you sure you want to delete order" name={confirmId}
          onConfirm={handleDelete} onCancel={()=>setConfirmId(null)} />
      )}
    </div>
  )
}
