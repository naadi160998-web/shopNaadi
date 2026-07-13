import { useState,useEffect } from 'react'
import { initialProducts } from '../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
// import { getStocks } from '../services/stockApi'
import { getWarehouse } from '../services/warehouseApi'

export default function Stocks() {

  const stockData = useSelector(state => state.warehouses.warehouseData)
  // console.log("stockData:",stockData);
  const [stocks] = useState(stockData)
  
  // get data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWarehouse())
  }, [dispatch])

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
              {stocks.map(p=>{
                return (
                  <tr key={p.id}>
                    <td><div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>{p.emoji}</span><span style={{fontWeight:800}}>{p.warehouses_products.product_name}</span></div></td>
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
