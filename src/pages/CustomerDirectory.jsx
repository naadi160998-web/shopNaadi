import { useEffect, useState } from 'react'
import { initialCustomers, AVATARS } from '../data/mockData'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from "../services/customerApi"

const TABS = ['All Customers', 'VIP Members', 'Recent']
const PER_PAGE = 4
const STATUS_OPTIONS = ['VIP CUSTOMER', 'REGULAR', 'NEW']

const emptyForm = { name: '', email: '', status: 'REGULAR', totalSpend: '', orders: '', avatar: '🐨' }

function getStatusClass(s) {
  if (s === 'VIP CUSTOMER') return 'status-badge status-vip'
  if (s === 'REGULAR') return 'status-badge status-regular'
  return 'status-badge status-new'
}

export default function CustomerDirectory() {

  const dispatch = useDispatch()

  const customerData = useSelector(state => state.customers.customerData)
  console.log("customerData:",customerData);
  
  const [customers, setCustomers] = useState(initialCustomers)
  const [activeTab, setActiveTab] = useState('All Customers')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // 'add' | 'edit'
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [nextId, setNextId] = useState(100)

  const filtered = customers.filter(c => {
    const matchTab = activeTab === 'VIP Members' ? c.status === 'VIP CUSTOMER'
      : activeTab === 'Recent' ? true : true
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  }).slice(0, activeTab === 'Recent' ? 3 : undefined)

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openAdd = () => { setForm(emptyForm); setModal('add') }
  const openEdit = c => { setForm({ name: c.name, email: c.email, status: c.status, totalSpend: c.totalSpend, orders: c.orders, avatar: c.avatar }); setEditId(c.id); setModal('edit') }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    if (modal === 'add') {
      setCustomers(prev => [...prev, { id: nextId, ...form, totalSpend: parseFloat(form.totalSpend)||0, orders: parseInt(form.orders)||0, lastActivity: 'Just now' }])
      setNextId(n => n + 1)
    } else {
      setCustomers(prev => prev.map(c => c.id === editId ? { ...c, ...form, totalSpend: parseFloat(form.totalSpend)||0, orders: parseInt(form.orders)||0 } : c))
    }
    closeModal()
  }

  const handleDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== confirmId))
    setConfirmId(null)
  }

  const confirmCustomer = customers.find(c => c.id === confirmId)

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} placeholder={placeholder}
        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
    </div>
  )

  useEffect(()=>{
    dispatch(getCustomers())
  },[dispatch])

  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Customers Directory</h1>
        <div className="topbar-actions">
          <input className="search-input" placeholder="🔍 Search..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }} />
          <button className="btn-outline">⬇ Export</button>
          <button className="btn-primary" onClick={openAdd}>👤+ Add Customer</button>
        </div>
      </div>

      <div className="summary-banner">
        <div className="banner-left">
          <div className="banner-label">TOTAL PORTFOLIO VALUE</div>
          <div className="banner-value">${customers.reduce((a,c)=>a+c.totalSpend,0).toLocaleString()}</div>
        </div>
        <div className="banner-chart">
          {[35,45,55,50,65,80,100].map((h,i)=>(
            <div key={i} className={`mini-bar${i>=5?' tall':''}`} style={{height:`${h}%`}} />
          ))}
        </div>
        <div style={{width:'1px',height:'60px',background:'#e0f0f0',flexShrink:0}} />
        <div className="banner-right">
          <div style={{fontSize:20,marginBottom:4}}>👥</div>
          <div className="customer-count">{customers.length.toLocaleString()}</div>
          <div className="customer-count-label">Total Active Customers</div>
          <div className="avatar-stack">
            {customers.slice(0,3).map((c,i)=>(
              <div key={i} className="avatar-stack-img">{c.avatar}</div>
            ))}
            <div className="avatar-stack-more">+{Math.max(0,customers.length-3)}</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {TABS.map(t=>(
          <button key={t} className={`tab${activeTab===t?' active':''}`}
            onClick={()=>{setActiveTab(t);setPage(1)}}>{t}</button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr>
              <th>Customer Details</th><th>Status</th>
              <th>Total Spend</th><th>Orders</th>
              <th>Last Activity</th>
              {/* <th>Actions</th> */}
            </tr></thead>
            <tbody>
              {paged.length === 0 && (
                <tr><td colSpan={6} style={{textAlign:'center',padding:'2rem',color:'var(--text-light)',fontWeight:700}}>No customers found</td></tr>
              )}
              {paged.map(c=>(
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">{c.avatar}</div>
                      <div>
                        <div className="customer-name">{c.name}</div>
                        <div className="customer-email">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={getStatusClass(c.status)}>{c.status}</span></td>
                  <td style={{fontWeight:800}}>${c.totalSpend.toLocaleString('en-US',{minimumFractionDigits:2})}</td>
                  <td style={{fontWeight:800}}>{c.orders}</td>
                  <td style={{color:'var(--text-light)',fontWeight:600}}>{c.lastActivity}</td>
                  {/* <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={()=>openEdit(c)}>✏️ Edit</button>
                      <button className="btn-danger" onClick={()=>setConfirmId(c.id)}>🗑 Delete</button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span className="pagination-info">Showing {filtered.length===0?0:(page-1)*PER_PAGE+1} to {Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} customers</span>
          <div className="pagination-btns">
            <button className="page-btn arrow" onClick={()=>setPage(p=>Math.max(1,p-1))}>‹</button>
            {Array.from({length:Math.min(totalPages,3)},(_,i)=>i+1).map(n=>(
              <button key={n} className={`page-btn${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
            ))}
            <button className="page-btn arrow" onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>›</button>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <Modal
          title={modal==='add'?'Add New Customer':'Edit Customer'}
          onClose={closeModal}
          footer={<>
            <button className="btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>{modal==='add'?'Add Customer':'Save Changes'}</button>
          </>}
        >
          <div className="form-group">
            <label className="form-label">Avatar</label>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {AVATARS.map(a=>(
                <button key={a} onClick={()=>setForm(f=>({...f,avatar:a}))}
                  style={{fontSize:22,width:40,height:40,borderRadius:'50%',border:`2px solid ${form.avatar===a?'var(--teal-deep)':'var(--teal-light)'}`,background:form.avatar===a?'var(--teal-light)':'white',cursor:'pointer'}}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            {field('Full Name','name','text','e.g. Aditi Mishra')}
            {field('Email','email','email','e.g. aditi@gmail.com')}
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            {field('Total Spend ($)','totalSpend','number','e.g. 5000')}
            {field('Total Orders','orders','number','e.g. 42')}
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete"
          name={confirmCustomer?.name}
          onConfirm={handleDelete}
          onCancel={()=>setConfirmId(null)}
        />
      )}
    </div>
  )
}
