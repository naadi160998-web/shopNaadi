import Header from '../components/Header'
import { orders, revenueData, initialProducts } from '../data/mockData'

const metrics = [
  { label: 'Total Revenue', value: '$84,320', change: '▲ 12.4%', up: true },
  { label: 'Total Orders', value: '1,248', change: '▲ 8.1%', up: true },
  { label: 'Avg Order Value', value: '$67.56', change: '▼ 2.3%', up: false },
  { label: 'New Customers', value: '342', change: '▲ 5.7%', up: true },
]

function getOrderClass(s) {
  return `order-status ${{Delivered:'os-delivered',Processing:'os-processing',Pending:'os-pending',Cancelled:'os-cancelled'}[s]||''}`
}

export default function Dashboard() {
  return (
    <div>
      <Header 
        pageTitle="Dashboard"
        description="Welcome back! Here's a quick overview of your store's performance and recent activity."
        actions={false}
      />

      <div className="metrics-grid">
        {metrics.map(m=>(
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className={`metric-change ${m.up?'up':'down'}`}>{m.change} vs last month</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) minmax(0,1fr)',gap:12,marginBottom:12}}>
        <div className="metric-card" style={{borderRadius:'var(--radius-xl)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <span style={{fontSize:14,fontWeight:800}}>Revenue Overview</span>
            <span style={{fontSize:11,background:'var(--teal-light)',color:'var(--teal-deep)',padding:'3px 10px',borderRadius:20,fontWeight:800}}>This year</span>
          </div>
          <div className="chart-bars">
            {revenueData.map((d,i)=>(
              <div key={d.month} className="bar-wrap">
                <div className={`bar${i%2===1?' alt':''}`} style={{height:`${d.value}%`}} />
                <div className="bar-lbl">{d.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="metric-card" style={{borderRadius:'var(--radius-xl)'}}>
          <div style={{fontSize:14,fontWeight:800,marginBottom:'1rem'}}>Top Products</div>
          {initialProducts.map((p,i)=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:18}}>{p.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:800}}>{p.name}</div>
                <div className="stock-bar-bg"><div className="stock-bar" style={{width:`${[82,65,50,38,28][i]}%`}} /></div>
              </div>
              <div style={{fontSize:13,fontWeight:800,color:'var(--teal-deep)'}}>${p.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-wrap">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.1rem',borderBottom:'1px solid #e8f5f5'}}>
          <span style={{fontSize:14,fontWeight:800}}>Recent Orders</span>
          <span style={{fontSize:12,color:'var(--teal-deep)',fontWeight:800,cursor:'pointer'}}>View all →</span>
        </div>
        <div className="table-scroll">
          <table className="customers-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id}>
                  <td style={{color:'var(--text-light)',fontWeight:700}}>{o.id}</td>
                  <td style={{fontWeight:700}}>{o.customer}</td>
                  <td style={{color:'var(--text-light)'}}>{o.date}</td>
                  <td style={{fontWeight:800}}>${o.amount.toFixed(2)}</td>
                  <td><span className={getOrderClass(o.status)}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
