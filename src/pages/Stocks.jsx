import { useState } from 'react'
import { initialProducts } from '../data/mockData'

export default function Stocks() {
  const [products] = useState(initialProducts)
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
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock Level</th><th>Status</th></tr></thead>
            <tbody>
              {products.map(p=>{
                const pct = Math.min(100,(p.stock/250)*100)
                const status = p.stock<20?'Low':p.stock<80?'Medium':'Good'
                const cls = status==='Low'?'os-cancelled':status==='Medium'?'os-processing':'os-delivered'
                return (
                  <tr key={p.id}>
                    <td><div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>{p.emoji}</span><span style={{fontWeight:800}}>{p.name}</span></div></td>
                    <td style={{color:'var(--text-light)',fontWeight:700}}>{p.category}</td>
                    <td style={{fontWeight:800}}>${p.price}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="stock-bar-bg" style={{flex:1}}><div className="stock-bar" style={{width:`${pct}%`}} /></div>
                        <span style={{fontSize:13,fontWeight:800,minWidth:30}}>{p.stock}</span>
                      </div>
                    </td>
                    <td><span className={`order-status ${cls}`}>{status}</span></td>
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
