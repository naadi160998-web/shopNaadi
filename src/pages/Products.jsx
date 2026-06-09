import { useEffect, useState } from 'react'
import { initialProducts, CATEGORIES, PRODUCT_EMOJIS } from '../data/mockData'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { createProduct, getProducts, updateProduct, updateProductImg, uploadProductImg } from '../services/productsApi'
import { useDispatch, useSelector } from 'react-redux'
import ImageUploader from '../components/ImageUploader'
import { removeProductId } from '../features/productSlice'
import { removeProductImages } from '../features/productImageSlice'
import Header from '../components/Header'

const emptyForm = {
  product_name: "",
  product_desc: "",
  old_price: "0.00",
  new_price: "",
  product_gender: "",
  product_dealer: "",
  product_discount: "0%",
  product_size: "",
  product_color: "",
  product_type: "",
  product_stock: "",
  vendor_id: 1,
  category_id: 0
}

const productSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

let BASE_URL = "http://localhost:3000/"

export default function Products() {

  const productDatas = useSelector(state => state.products.productsData)
  // console.log("productDatas:",productDatas);
  // const { product_id, vendor_id, category_id, product_gender, product_size, product_type, product_color } = useSelector(state => state.products.productId)
  const { product_id, vendor_id, category_id, product_gender, product_size, product_type, product_color } = useSelector(state => state.products.productId)
  console.log("productId:", product_id);
  const productImgPaths = useSelector(state => state.productImages.productImgPaths)
  console.log("productImgPaths:", productImgPaths);

  const [products, setProducts] = useState(!productDatas ? [] : productDatas) // Start with empty list for testing add functionality
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [nextId, setNextId] = useState(100)
  const [editImg, setEditImg] = useState(null)
  
  // dispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts(form.vendor_id))
  }, [dispatch, form.vendor_id])

  const filtered = products.filter(p =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    p.category_id.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { 
    setForm(emptyForm); setModal('add') 
    dispatch(removeProductId())
  }
  const openEdit = p => {
    
    setForm({
      product_name: p.product_name,
      product_desc: p.product_desc,
      old_price: p.old_price,
      new_price: p.new_price,
      product_gender: p.product_gender,
      product_dealer: p.product_dealer,
      product_discount: p.product_discount,
      product_size: p.product_size,
      product_color: p.product_color,
      product_type: p.product_type,
      product_stock: p.product_stock,
      vendor_id: p.vendor_id,
      category_id: p.category_id
    }); 
    setEditId(p.product_id); 
    setModal('edit'); 
    setEditImg(p.productimgs)
    console.log("edit img:",p.productimgs);
    
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {

    dispatch(removeProductImages())
    if (!form.product_name.trim()) return

    if (modal === 'add') {
      setProducts(prev => [...prev, { product_id: nextId, ...form, price: parseFloat(form.new_price) || 0, stock: parseInt(form.product_stock) || 0 }])
      setNextId(n => n + 1)
      dispatch(createProduct(form))
    } else {
      // update input fields
      console.log("form:",form);
      setProducts(prev => [...prev, { product_id: editId, ...form, price: parseFloat(form.new_price) || 0, stock: parseInt(form.product_stock) || 0 }])
      setNextId(n => n + 1)
      dispatch(updateProduct(editId,form))
    }
    // closeModal() //nadimuthu, move this to image upload step
  }

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== confirmId))
    setConfirmId(null)
  }

  const [singleImage, setSingleImage] = useState(null)
  const [multiImages, setMultiImages] = useState([])

  const handleImageSubmit = async () => {
    try {
      const formData = new FormData();

      if (singleImage) {
        formData.append('single', singleImage[0])
      }

      multiImages.forEach((img) => {
        formData.append("multiple", img)
      })

      const obj = {
        vendor_id: vendor_id,
        product_id: product_id,
        category_id: category_id,
        product_gender: product_gender === "" ? "NA" : product_gender,
        product_color: product_color === "" ? "NA" : product_color,
        product_size: product_size === "" ? "NA" : product_size,
        product_type: product_type === "" ? "NA" : product_type
      }

      dispatch(uploadProductImg(formData, obj))

    } catch (error) {
      console.error("Upload Img:", error);

    }
  }

  const handleFinish = () => {
    ////console.log("finish");
    dispatch(removeProductId())
    closeModal()
  }

  // handle single by single update image gallery
  const handleGalleryImage = (product_img_id,product_img_src) => {
    try {
      const obj = {
        vendor_id: form.vendor_id,
        product_id: editId,
        product_gender: form.product_gender,
        product_color: form.product_color,
        product_size: form.product_size,
        product_type: form.product_type,
        category_id: form.category_id,
        product_img_id: product_img_id
      }
      console.log("obj:",obj);
      console.log("productImgPaths:",product_img_src);
      
      // Image update upload
      const formData = new FormData();
      if (singleImage) {
        formData.append('image', singleImage[0])
        formData.append('oldImagePath', product_img_src)
      }
      
      updateProductImg(formData, obj)
    } catch (error) {
      console.log("error:",error);
      
    }
  }
  
  const confirmProduct = products.find(p => p.id === confirmId)

  return (
    <div>
      <Header 
          pageTitle="Products"
          search={search}
          setSearch={setSearch}
          openAdd={openAdd}
          actions={true}
          description="Manage your product listings, edit details, and track inventory levels."
      />      

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)', fontWeight: 700, fontSize: 16 }}>
          No products found 📦
        </div>
      )}

      <div className="products-grid">
        {filtered.map(p => (
          <div key={p.product_id} className="product-card">
            <div className="product-emoji">{p.emoji}</div>
            <div className="product-info">
              <div className="product-name">{p.product_name}</div>
              {/* <div className="product-cat">{p.category}</div> */}
              <div className="product-price">${parseFloat(p.new_price).toFixed(2)}</div>
              <div className="stock-bar-bg">
                <div className="stock-bar" style={{ width: `${Math.min(100, (p.product_stock / 250) * 100)}%` }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 3, fontWeight: 700 }}>{p.product_stock} in stock</div>
              <div className="action-btns" style={{ marginTop: 10 }}>
                <button className="btn-edit" onClick={() => openEdit(p)}>✏️ Edit</button>
                <button className="btn-danger" onClick={() => setConfirmId(p.product_id)}>🗑 Delete</button>
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
            <button className="btn-primary" onClick={product_id === undefined ? handleSave : productImgPaths.length === 0 ? handleImageSubmit : handleFinish}>{ modal !== 'add' ? "update" : product_id === undefined ? "Next Image" : productImgPaths.length === 0 ? "Check It" : "Finish"
            }</button>
          </>}
        >
          <div style={{ 
            display: product_id !== undefined ? "none" : "block" 
          }}>
            <div className="form-group">
              <label className="form-label">Product Category</label>
              <select className="form-select" value={form.category_id}
                onChange={e => {
                  const selectedId = Number(e.target.value)
                  const selectedCategory = CATEGORIES.find(c => c.id === selectedId)
                  // //console.log("selectedCategory:", selectedCategory);
                  setForm(f => ({ ...f, product_type: selectedCategory ? selectedCategory.name : '', category_id: selectedId || 0 }))
                }}>
                <option value="">Select Categories</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}  {/**Bug one */}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input className="form-input" placeholder="e.g. Wireless Keyboard" value={form.product_name}
                onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Description</label>
              <input className="form-input" placeholder="e.g. Wireless Keyboard" value={form.product_desc}
                onChange={e => setForm(f => ({ ...f, product_desc: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Stock</label>
              <input className="form-input" placeholder="e.g. 100" value={form.product_stock}
                onChange={e => setForm(f => ({ ...f, product_stock: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Price</label>
              <input className="form-input" placeholder="e.g. 99.99" value={form.new_price}
                onChange={e => setForm(f => ({ ...f, new_price: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Gender</label>
              <div>
                <input type="radio" name='gender' value='Male' checked={form.product_gender === 'Male'} onChange={(e) => setForm(f => ({ ...f, product_gender: e.target.value }))} />
                <label htmlFor="">Male</label>
              </div>
              <div>
                <input type="radio" name='gender' value='Female' checked={form.product_gender === 'Female'} onChange={(e) => setForm(f => ({ ...f, product_gender: e.target.value }))} />
                <label htmlFor="">Female</label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Product Dealer</label>
              <input className="form-input" placeholder="e.g. Wireless Keyboard" value={form.product_dealer}
                onChange={e => setForm(f => ({ ...f, product_dealer: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Color</label>
              <input className="form-input" placeholder="e.g. Wireless Keyboard" value={form.product_color}
                onChange={e => setForm(f => ({ ...f, product_color: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Product Sizes</label>
              {
                productSizes.map(size => (
                  <div key={size}>
                    <input type='checkbox' value={size} checked={form.product_size.split(',').includes(size)}
                      onChange={e => {
                        //console.log("size:", size);

                        const checked = e.target.checked
                        setForm(f => {
                          let newSizes = f.product_size.split(',').filter(s => s) // Convert to array and remove empty
                          if (checked) {
                            newSizes.push(size) // Add size if checked
                          } else {
                            newSizes = newSizes.filter(s => s !== size) // Remove size if unchecked
                          }
                          return { ...f, product_size: newSizes.join(',') } // Convert back to comma string
                        })
                      }} />
                    <label htmlFor="">{size}</label>
                  </div>
                ))
              }
            </div>
            <div style={{
              display: modal !== "edit" ? "none" : "block"
            }}>
              <label className="form-label">Main Image</label>
              {
                editImg &&
                [...editImg].slice(0, 1)?.map((e, i) => (
                  <div key={i}>
                    <img
                      width={100}
                      height={100}
                      src={`${BASE_URL}${e.product_img_src}`}
                    />
                    <ImageUploader
                      multiple={false}
                      onChange={setSingleImage}
                      title="1 only choose images"
                      label="Choose Main Image"
                      loading={false}
                    />
                    <button onClick={() => handleGalleryImage(e.product_img_id,e.product_img_src)}>Change</button>
                  </div>
                ))
              }
            </div>
            <br />
            <label className="form-label">Gallery Images</label>
            <div style={{
              display: modal !== "edit" ? "none" : "block"
            }}>
              {
                  editImg &&
                [...editImg].slice(1)?.map((e, i) => (
                  <div 
                     key={i}
                  >
                  <img
                    width={100}
                    height={100}
                    src={`${BASE_URL}${e.product_img_src}`}
                  />
                    <ImageUploader
                      multiple={false}
                      onChange={setSingleImage}
                      title="1 only choose images"
                      label="Choose Gallery Images"
                      loading={false}
                    />
                    <button onClick={() => handleGalleryImage(e.product_img_id,e.product_img_src)}>Change</button>
                  </div>
                ))
              }
              {/* <ImageUploader
                multiple={true}
                onChange={setMultiImages}
                title="Minimum 2 or Maximum 5 choose images"
                label="Choose Gallery Images"
                loading={false}
              /> */}
            </div>
          </div>
          <div style={{
            display: product_id === undefined || productImgPaths.length !== 0 ? "none" : modal === "edit" ? "none" : "block"
          }}>
            <div justify='center' align='center' direction='column' gap="md">
              <ImageUploader
                multiple={false}
                onChange={setSingleImage}
                title="1 only choose images"
                label="Choose Main Image"
                loading={false}
              />
              <ImageUploader
                multiple={true}
                onChange={setMultiImages}
                title="Minimum 2 or Maximum 5 choose images"
                label="Choose Gallery Images"
                loading={false}
              />

              <button onClick={handleImageSubmit}>Upload</button>
            </div>
          </div>

          <div style={{
            display: product_id === undefined ? "none" : "block"
          }}>
            {
              productImgPaths.map((e, i) => (
                <img
                  key={i}
                  width={200}
                  height={200}
                  src={`${BASE_URL}${e.product_img_src}`}
                />
              ))
            }
          </div>
        </Modal>
      )}

      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete"
          name={confirmProduct?.product_name}
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}
