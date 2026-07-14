import { useEffect, useState } from 'react'
import { CATEGORIES, PRODUCT_EMOJIS } from '../data/mockData'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { createBrands, getBrands, updateBrands,deleteBrand } from '../services/brandsApi'
import { useDispatch, useSelector } from 'react-redux'
import { removeBrandsId } from '../features/brandSlice'
import Header from '../components/Header'

const emptyForm = {
  brand_name: ""
}

const Brand = () => {

  const brandDatas = useSelector(state => state.brands.brandsData)
  // console.log("brandDatas:",brandDatas);
  // const brandDatas = []
  const [brands, setBrands] = useState(!brandDatas ? [] : brandDatas) // Start with empty list for testing add functionality
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [nextId, setNextId] = useState(100)
  
  // dispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBrands())
  }, [dispatch])

  const filtered = brands.filter(p =>
    p.brand_name !== undefined && p.brand_name.toLowerCase().includes(search.toLowerCase()) ||
    p.city !== undefined && p.city.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { 
    setForm(emptyForm); setModal('add') 
    dispatch(deleteBrand())
  }
  const openEdit = w => {
    
    setForm({
      brand_name: w.brand_name
    }); 
    setEditId(w.brand_id); 
    setModal('edit'); 
    
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {

    if (!form.brand_name.trim()) return

    if (modal === 'add') {
      console.log("save form:",form);
      createBrands(form).then(res => {
        if (res.status === 201) {
          closeModal()
        }
      })
    } else {
      // update input fields
      console.log("form:",form);
      
      updateBrands(editId,form).then(res => {
        if(res.status === 200){
          closeModal()
        }
      })
      // closeModal()
    }
    // closeModal() //nadimuthu, move this to image upload step
  }

  const handleDelete = (e) => {
    deleteBrand(e.brand_id).then(res => {
      if(res.status === 200){
        alert("Deleted Successfully")
      }
    })
    setBrands(prev => prev.filter(w => w.brand_id !== confirmId))
    setConfirmId(null)
  }


  const handleFinish = () => {
    dispatch(removeBrandsId())
    closeModal()
  }
  
  const confirmWarehouse = brands.find(w => w.brand_id === confirmId)
  
  return (
    <div>
      <Header 
          pageTitle="Brands"
          search={search}
          setSearch={setSearch}
          openAdd={openAdd}
          actions={true}
          description="Manage your brand listings."
          btnName={"Brands"}
      />      

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)', fontWeight: 700, fontSize: 16 }}>
          No brands found 📦
        </div>
      )}

      <div className="products-grid">
        {filtered.map((w,i) => (
          <div key={i} className="product-card">
            <div className="product-emoji">{w.emoji}</div>
            <div className="product-info">
              <div className="product-name">{w.brand_name}</div>
              <div className="action-btns" style={{ marginTop: 10 }}>
                <button className="btn-edit" onClick={() => openEdit(w)}>✏️ Edit</button>
                <button className="btn-danger" onClick={() => setConfirmId(w.brand_id)}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add New Brand' : 'Edit Brand'}
          onClose={closeModal}
          footer={<>
            <button className="btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>{ modal !== 'add' ? "update" : "add"
            }</button>
          </>}
        >
          <div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" placeholder="e.g. APPLE, SAMSUNG, SONY" value={form.brand_name}
                onChange={e => setForm(f => ({ ...f, brand_name: e.target.value }))} />
            </div>
          </div>
        </Modal>
      )}

      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete"
          name={confirmWarehouse?.brand_name}
          onConfirm={(()=>handleDelete(confirmWarehouse))}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}


export default Brand