import { useEffect, useState } from 'react'
import { CATEGORIES, PRODUCT_EMOJIS } from '../data/mockData'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { createWarehouse, getWarehouse, updateWarehouse,deleteWarehouse } from '../services/warehouseApi'
import { useDispatch, useSelector } from 'react-redux'
import ImageUploader from '../components/ImageUploader'
import { removeWarehousesId } from '../features/warehousesSlice'
import Header from '../components/Header'

const emptyForm = {
  warehouse_name: "",
  city: "",
  qty:0,
  product_id:0
}

const Warehouses = () => {

  const warehouseDatas = useSelector(state => state.warehouses.warehouseData)
  const productDatas = useSelector(state => state.products.productsData)
  // console.log("warehouseDatas:",warehouseDatas);
  // console.log("productDatas:",productDatas);
  
  // const warehouseDatas = []
  const [warehouses, setWarehouses] = useState(!warehouseDatas ? [] : warehouseDatas) // Start with empty list for testing add functionality
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [nextId, setNextId] = useState(100)
  
  // dispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWarehouse())
  }, [dispatch])

  const filtered = warehouses.filter(p =>
    p.warehouse_name !== undefined && p.warehouse_name.toLowerCase().includes(search.toLowerCase()) ||
    p.city !== undefined && p.city.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { 
    setForm(emptyForm); setModal('add') 
    dispatch(deleteWarehouse())
  }
  const openEdit = w => {
    
    setForm({
      warehouse_name: w.warehouse_name,
      city: w.city,
      qty:w.qty,
      product_id: w.product_id
    }); 
    setEditId(w.warehouse_id); 
    setModal('edit'); 
    // console.log("edit img:",w);
    
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {

    if (!form.warehouse_name.trim()) return

    if (modal === 'add') {
      console.log("save form:",form);
      form.product_id = parseInt(form.product_id)
      form.qty = parseInt(form.qty)
      // setWarehouses(prev => [...prev, { warehouse_id: nextId, ...form}])
      // setNextId(n => n + 1)
      createWarehouse(form).then(res => {
        if (res.status === 401) {
          closeModal()
        }
      })
    } else {
      // update input fields
      console.log("form:",form);
      form.product_id = parseInt(form.product_id)
      form.qty = parseInt(form.qty)
      // setWarehouses(prev => [...prev, { warehouse_id: editId, ...form}])
      // setNextId(n => n + 1)
      updateWarehouse(editId,form).then(res => {
        if(res.status === 201){
          closeModal()
        }
      })
      // closeModal()
    }
    // closeModal() //nadimuthu, move this to image upload step
  }

  const handleDelete = (e) => {
    deleteWarehouse(e.warehouse_id).then(res => {
      if(res.status === 200){
        alert("Deleted Successfully")
      }
    })
    setWarehouses(prev => prev.filter(w => w.warehouse_id !== confirmId))
    setConfirmId(null)
  }


  const handleFinish = () => {
    ////console.log("finish");
    dispatch(removeWarehousesId())
    closeModal()
  }

  const productName = (pid) =>{
    const findProductName = productDatas.find(e => e.product_id === pid)
    return findProductName.product_name
  }
  
  const confirmWarehouse = warehouses.find(w => w.warehouse_id === confirmId)
  // console.log("confirmWarehouse:",confirmWarehouse);
  
  return (
    <div>
      <Header 
          pageTitle="Warehouses"
          search={search}
          setSearch={setSearch}
          openAdd={openAdd}
          actions={true}
          description="Manage your warehouse listings."
          btnName={"Warehouses"}
      />      

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)', fontWeight: 700, fontSize: 16 }}>
          No warehouses found 📦
        </div>
      )}

      <div className="products-grid">
        {filtered.map((w,i) => (
          <div key={i} className="product-card">
            <div className="product-emoji">{w.emoji}</div>
            <div className="product-info">
              <div className="product-name">{w.warehouse_name}</div>
              <div className="product-name">{w.city}</div>
              <div className="product-name">{productName(w.product_id)}</div>
              <div className="action-btns" style={{ marginTop: 10 }}>
                <button className="btn-edit" onClick={() => openEdit(w)}>✏️ Edit</button>
                <button className="btn-danger" onClick={() => setConfirmId(w.warehouse_id)}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add New Warehouse' : 'Edit Warehouse'}
          onClose={closeModal}
          footer={<>
            <button className="btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>{ modal !== 'add' ? "update" : "add"
            }</button>
          </>}
        >
          <div>
            <div className="form-group">
              <label className="form-label">Product</label>
              <select className="form-select" value={form.product_id} onChange={e => setForm(f => ({ ...f, product_id:e.target.value}))}>
                <option value={null}>Select products</option>
                {
                  productDatas.map((p,i) =>(
                    <option key={i} value={p.product_id}>{p.product_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" placeholder="e.g. Naadi, TCS, APPLE" value={form.warehouse_name}
                onChange={e => setForm(f => ({ ...f, warehouse_name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="e.g. Chennai,Mumbai" value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Quantity</label>
              <input className="form-input" placeholder="0" value={form.qty}
                onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            </div>
          </div>
        </Modal>
      )}

      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete"
          name={confirmWarehouse?.warehouse_name}
          onConfirm={(()=>handleDelete(confirmWarehouse))}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}


export default Warehouses