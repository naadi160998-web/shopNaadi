import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Stocks from './pages/Stocks'
import Orders from './pages/Orders'
import Invoices from './pages/Invoices'
import Customers from './pages/Customers'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import { IconSquareRoundedArrowRight } from '@tabler/icons-react'
import Warehouses from './pages/Warehouses'
import Brand from './pages/Brand'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true)
  useEffect(() => {
    const h = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isDesktop
}

export default function App() {
  const isDesktop = useIsDesktop()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  // Close on mobile route change
  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false)
  }, [location, isDesktop])

  const showPushed = isDesktop && sidebarOpen

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setSidebarOpen={setSidebarOpen} />
      <button
        onClick={() => setSidebarOpen(o => !o)}
        style={{ border: "none", background: 'none', position: 'absolute', top: '0.5rem', left: '1rem' }}
        title="Toggle Sidebar"
      >
        <IconSquareRoundedArrowRight color="var(--teal-dark)" />
      </button>
      <div className="main" style={{ marginLeft: showPushed ? 'var(--sidebar-w)' : 'var(--sidebar-w1)', transition: 'margin-left .50s cubic-bezier(.4,0,.2,1)' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/warehouse' element={<Warehouses />}/>
          <Route path='/brand' element={<Brand />}/>
          <Route path="/products" element={<Products />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}
