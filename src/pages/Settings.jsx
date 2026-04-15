import { useState } from 'react'
export default function Settings() {
  const [toggles, setToggles] = useState({emailNotif:true,smsNotif:false,vipAlerts:true,darkMode:false})
  const toggle = k => setToggles(t=>({...t,[k]:!t[k]}))
  return (
    <div>
      <div className="topbar">
        <h1 className="page-title">Settings</h1>
        <div className="topbar-actions"><button className="btn-primary">Save Changes</button></div>
      </div>
      <div className="settings-section">
        <div className="settings-title">Profile</div>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:'1rem'}}>
          <div style={{width:60,height:60,borderRadius:'50%',background:'var(--teal-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,border:'3px solid var(--teal-mid)'}}>🐨</div>
          <div>
            <div style={{fontSize:15,fontWeight:800}}>NaadiMuthu</div>
            <div style={{fontSize:13,color:'var(--text-light)',fontWeight:700}}>admin@shopdash.com</div>
          </div>
          <button className="btn-outline" style={{marginLeft:'auto'}}>Change Avatar</button>
        </div>
        {[{label:'Full Name',value:'NaadiMuthu'},{label:'Email',value:'admin@shopdash.com'},{label:'Phone',value:'+91 9876543210'}].map(f=>(
          <div key={f.label} style={{display:'flex',flexDirection:'column',gap:4,marginBottom:12}}>
            <label className="form-label">{f.label}</label>
            <input defaultValue={f.value} className="form-input" />
          </div>
        ))}
      </div>
      <div className="settings-section">
        <div className="settings-title">Notifications</div>
        {[{key:'emailNotif',label:'Email Notifications',desc:'Receive order and customer updates via email'},{key:'smsNotif',label:'SMS Notifications',desc:'Get SMS alerts for urgent notifications'},{key:'vipAlerts',label:'VIP Customer Alerts',desc:'Alert when a customer reaches VIP status'},{key:'darkMode',label:'Dark Mode',desc:'Switch to dark theme (coming soon)'}].map(s=>(
          <div key={s.key} className="settings-row">
            <div>
              <div className="settings-label">{s.label}</div>
              <div className="settings-desc">{s.desc}</div>
            </div>
            <button className={`toggle ${toggles[s.key]?'on':'off'}`} onClick={()=>toggle(s.key)} />
          </div>
        ))}
      </div>
    </div>
  )
}
