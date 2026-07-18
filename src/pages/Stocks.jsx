import { useState, useEffect } from 'react'
import { initialProducts } from '../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'
import { getWarehouse, updateWarehouse, deleteWarehouse } from '../services/warehouseApi'

const emptyForm = {
  product_id: null,
  warehouse_id: null,
  qty: 0
}

export default function Stocks() {

  const stockData = useSelector(state => state.warehouses.warehouseData)
  const productDatas = useSelector(state => state.products.productsData)
  // console.log("stockData:",stockData);
  // console.log("productDatas:",productDatas);

  // get data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWarehouse())
  }, [dispatch])

  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [warehouseData,setWarehouseData] = useState(stockData)

  const openEdit = w => {
    setForm(emptyForm);
    // dispatch(deleteWarehouse())
    setModal('edit');
    // console.log("edit img:",w);

  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = () => {

    // if (!form.warehouse_name.trim()) return

    if (modal !== 'add') {
      // update input fields
      // console.log("form:",form);
      form.product_id = parseInt(form.product_id)
      form.warehouse_id = parseInt(form.warehouse_id)
      form.qty = parseInt(form.qty)
      console.log("form:",form);
      // setWarehouses(prev => [...prev, { warehouse_id: editId, ...form}])
      // setNextId(n => n + 1)
      updateWarehouse(editId, form).then(res => {
        if (res.status === 200) {
          closeModal()
        }
      })
    }
  }

  // onchange product
  function productSelect(e) {
    setForm(f => ({ ...f, product_id: e.target.value }))

    const warehouses = stockData.filter(f => f.product_id === parseInt(e.target.value))
    setWarehouseData(warehouses)
  }

  function warehouseSelect(e) {
    setForm(f => ({ ...f, warehouse_id: e.target.value }))
    setEditId(parseInt(e.target.value))
    const qty = warehouseData.filter(f => f.warehouse_id === parseInt(e.target.value))
    // console.log("qty:",qty[0].qty);
    // setForm(f => [{...f, qty:parseInt(qty[0].qty)}])
    setForm(f => ({ ...f, qty: parseInt(qty[0].qty) }))
  }

  function productName(product_id) {
    const product = productDatas.find(p => p.product_id === product_id)
    return product.product_name
  }

  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Stocks</h1>
        <div className="topbar-actions">
          <button className="btn-outline">⬇ Export</button>
          <button className="btn-primary" onClick={() => openEdit()}>＋ Restock</button>
        </div>
      </div>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr><th>Product</th><th>Warehouse</th><th>Quantity</th></tr></thead>
            <tbody>
              {stockData.map((p, i) => {
                return (
                  <tr key={i}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 22 }}>{p.emoji}</span><span style={{ fontWeight: 800 }}>{productName(p.product_id)}</span></div></td>
                    <td style={{ color: 'var(--text-light)', fontWeight: 700 }}>{p.warehouse_name}</td>
                    <td style={{ fontWeight: 800 }}>{p.qty}</td>
                  </tr>
                )
              })}
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
              <select className="form-select" value={form.product_id} onChange={e => productSelect(e)}>
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
              <select className="form-select" value={form.warehouse_id} onChange={e => warehouseSelect(e)}>
                <option value={null}>Select Warehouses</option>
                {
                  warehouseData.map((p, i) => (
                    <option key={i} value={p.warehouse_id}>{`${p.warehouse_name}-[${p.city.slice(0, 2)}]`}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Product Quantity</label>
              <input className="form-input" placeholder="0" value={form.qty}
                onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
