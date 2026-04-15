const notifications = [
  {id:1,title:'New VIP Customer',desc:'Aditi Mishra has reached VIP status',time:'2 hrs ago',read:false},
  {id:2,title:'Order Delivered',desc:'Order #10241 has been delivered successfully',time:'3 hrs ago',read:false},
  {id:3,title:'Low Stock Alert',desc:'Wireless Earbuds stock is below 10 units',time:'5 hrs ago',read:false},
  {id:4,title:'New Order',desc:'New order #10244 received from Priya M.',time:'6 hrs ago',read:true},
  {id:5,title:'Payment Received',desc:'Payment of $212.00 confirmed for order #10239',time:'1 day ago',read:true},
]
export default function Notifications() {
  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Notifications</h1>
        <div className="topbar-actions"><button className="btn-outline">Mark all read</button></div>
      </div>
      <div className="table-wrap">
        {notifications.map(n=>(
          <div key={n.id} className={`notif-item${n.read?'':' unread'}`}>
            <div className={`notif-dot${n.read?' read':''}`} />
            <div style={{flex:1}}>
              <div className="notif-title">{n.title}</div>
              <div className="notif-desc">{n.desc}</div>
            </div>
            <div className="notif-time">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
