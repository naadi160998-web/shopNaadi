export const initialCustomers = [
  { id: 1, name: 'Aditi Mishra', email: 'Aditi@gmail.com', status: 'VIP CUSTOMER', totalSpend: 24450, orders: 142, lastActivity: '2 hours ago', avatar: '🐨' },
  { id: 2, name: 'Rahul Sharma', email: 'rahul@gmail.com', status: 'VIP CUSTOMER', totalSpend: 18200, orders: 98, lastActivity: '5 hours ago', avatar: '🐻' },
  { id: 3, name: 'Priya Nair', email: 'priya@gmail.com', status: 'REGULAR', totalSpend: 5430, orders: 34, lastActivity: '1 day ago', avatar: '🐼' },
  { id: 4, name: 'Karthik Raj', email: 'karthik@gmail.com', status: 'VIP CUSTOMER', totalSpend: 21900, orders: 120, lastActivity: '3 hours ago', avatar: '🦊' },
  { id: 5, name: 'Sneha Pillai', email: 'sneha@gmail.com', status: 'REGULAR', totalSpend: 3200, orders: 20, lastActivity: '2 days ago', avatar: '🐰' },
  { id: 6, name: 'Deepak Kumar', email: 'deepak@gmail.com', status: 'NEW', totalSpend: 840, orders: 5, lastActivity: '3 days ago', avatar: '🐸' },
  { id: 7, name: 'Ananya Das', email: 'ananya@gmail.com', status: 'VIP CUSTOMER', totalSpend: 16500, orders: 87, lastActivity: '1 hour ago', avatar: '🐱' },
  { id: 8, name: 'Vikram Singh', email: 'vikram@gmail.com', status: 'REGULAR', totalSpend: 7800, orders: 45, lastActivity: '4 hours ago', avatar: '🐯' },
]

export const initialProducts = [
  { id: 1, name: 'iPhone 16 Case', category: 'Electronics', price: 29.99, stock: 142, emoji: '📱' },
  { id: 2, name: 'Running Shoes', category: 'Clothing', price: 89.99, stock: 58, emoji: '👟' },
  { id: 3, name: 'Desk Plant Pot', category: 'Home & Garden', price: 24.99, stock: 203, emoji: '🪴' },
  { id: 4, name: 'Wireless Earbuds', category: 'Electronics', price: 59.99, stock: 75, emoji: '🎧' },
  { id: 5, name: 'Scented Candle Set', category: 'Home & Garden', price: 34.99, stock: 91, emoji: '🕯️' },
]

export const orders = [
  { id: '#10241', customer: 'Arjun K.', date: 'Apr 7', amount: 128.00, status: 'Delivered' },
  { id: '#10240', customer: 'Priya M.', date: 'Apr 7', amount: 74.50, status: 'Processing' },
  { id: '#10239', customer: 'Sara R.', date: 'Apr 6', amount: 212.00, status: 'Pending' },
  { id: '#10238', customer: 'Mohit N.', date: 'Apr 6', amount: 39.99, status: 'Cancelled' },
  { id: '#10237', customer: 'Layla T.', date: 'Apr 5', amount: 95.00, status: 'Delivered' },
]

export const revenueData = [
  { month: 'Jan', value: 55 }, { month: 'Feb', value: 40 }, { month: 'Mar', value: 70 },
  { month: 'Apr', value: 60 }, { month: 'May', value: 80 }, { month: 'Jun', value: 65 },
  { month: 'Jul', value: 90 }, { month: 'Aug', value: 75 }, { month: 'Sep', value: 85 },
  { month: 'Oct', value: 100 }, { month: 'Nov', value: 88 }, { month: 'Dec', value: 92 },
]

export const AVATARS = ['🐨','🐻','🐼','🦊','🐰','🐸','🐱','🐯','🦁','🐮','🐷','🐙']
export const CATEGORIES = [{id:8,name:'Clothing'},{id:9,name:'Electronics'},{id:10,name:'Home & Garden'},{id:11,name:'Sports'},{id:12,name:'Books'},{id:13,name:'Beauty'}]
export const PRODUCT_EMOJIS = { Electronics:'📱', Clothing:'👕', 'Home & Garden':'🪴', Sports:'⚽', Books:'📚', Beauty:'💄' }
