import { IconSquareRoundedArrowLeft, IconSquareRoundedArrowRight } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞' },
  { to: '/warehouse', label: 'Warehouses', icon: '👕', chevron: true },
  { to: '/products', label: 'Products', icon: '👕', chevron: true },
  { to: '/stocks', label: 'Stocks', icon: '🏠' },
  { to: '/orders', label: 'Orders', icon: '🛒', badge: 12 },
  { to: '/invoices', label: 'Invoices', icon: '📋' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  // { to: '/notifications', label: 'Notifications', icon: '🔔', badge: 3 },
  { to: '/settings', label: 'Settings', icon: '⚙️', chevron: true },
]

export default function Sidebar({ open, onClose, setSidebarOpen }) {
  return (
    <>
      <div className={`sidebar-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`sidebar${open ? ' open' : ' collapsed'}`}>
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(o => !o)}
          style={{ marginBottom: '1rem' }}
          title="Toggle Sidebar"
        >
          {open ? <IconSquareRoundedArrowLeft color="var(--teal-deep)" /> : <IconSquareRoundedArrowRight color="var(--teal-dark)" />}
        </button>
        <div className="sidebar-profile">
          <div className="sidebar-avatar">🐨</div>
          <div className="sidebar-name">Naadi</div>
        </div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <div className="nav-icon-wrap">{item.icon}</div>
            {open ? item.label : ""}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.chevron && !item.badge && <span className="nav-chevron">›</span>}
          </NavLink>
        ))}
      </aside>
    </>
  )
}
