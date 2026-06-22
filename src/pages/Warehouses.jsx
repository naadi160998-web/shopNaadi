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
  product_id:0
}

const Warehouses = () => {

  const warehouseDatas = useSelector(state => state.warehouses.warehouseData)
  console.log("warehouseDatas:",warehouseDatas);
  
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
    p.warehouse_name.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { 
    setForm(emptyForm); setModal('add') 
    dispatch(removeProductId())
  }
  const openEdit = w => {
    
    setForm({
      warehouse_name: w.warehouse_name,
      city: w.city,
      product_id: w.product_id
    }); 
    setEditId(w.warehouse_id); 
    setModal('edit'); 
    console.log("edit img:",w);
    
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {

    if (!form.warehouse_name.trim()) return

    if (modal === 'add') {
      setWarehouses(prev => [...prev, { warehouse_id: nextId, ...form}])
      setNextId(n => n + 1)
      dispatch(createWarehouse(form))
    } else {
      // update input fields
      console.log("form:",form);
      setWarehouses(prev => [...prev, { warehouse_id: editId, ...form}])
      setNextId(n => n + 1)
      dispatch(updateWarehouse(editId,form))
    }
    // closeModal() //nadimuthu, move this to image upload step
  }

  const handleDelete = (e) => {
    dispatch(deleteWarehouse(e.warehouse_id))
    setWarehouses(prev => prev.filter(w => w.warehouse_id !== confirmId))
    setConfirmId(null)
  }


  const handleFinish = () => {
    ////console.log("finish");
    dispatch(removeWarehousesId())
    closeModal()
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
        {filtered.map(w => (
          <div key={w.warehouse_id} className="product-card">
            <div className="product-emoji">{w.emoji}</div>
            <div className="product-info">
              <div className="product-name">{w.warehouse_name}</div>
              <div className="product-name">{w.city}</div>
              <div className="product-name">{w.product_id}</div>
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
          title={modal === 'add' ? 'Add New Product' : 'Edit Product'}
          onClose={closeModal}
          footer={<>
            <button className="btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>{ modal !== 'add' ? "update" : "add"
            }</button>
          </>}
        >
          <div style={{ 
            display: warehouse_id !== undefined ? "none" : "block" 
          }}>
            <div className="form-group">
              <label className="form-label">Warehouse Name</label>
              <input className="form-input" placeholder="e.g. Naadi, TCS, APPLE" value={form.warehouse_name}
                onChange={e => setForm(f => ({ ...f, warehouse_name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Warehouse City</label>
              <input className="form-input" placeholder="e.g. Chennai,Mumbai" value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
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