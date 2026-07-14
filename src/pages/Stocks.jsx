import { useState,useEffect } from 'react'
import { initialProducts } from '../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
// import { getStocks } from '../services/stockApi'
import { getWarehouse } from '../services/warehouseApi'

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
          <button className="btn-primary">＋ Restock</button>
        </div>
      </div>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr><th>Product</th><th>Warehouse</th><th>Quantity</th></tr></thead>
            <tbody>
              {stockData.map(p=>{
                return (
                  <tr key={p.id}>
                    <td><div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>{p.emoji}</span><span style={{fontWeight:800}}>{productName(p.product_id)}</span></div></td>
                    <td style={{color:'var(--text-light)',fontWeight:700}}>{p.warehouse_name}</td>
                    <td style={{fontWeight:800}}>{p.qty}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
