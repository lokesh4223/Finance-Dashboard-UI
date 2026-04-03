# Finance Dashboard - Developer Quick Reference

## 📁 File Structure Quick Reference

```
src/
├── components/
│   ├── Navbar.js              → Navigation + Role Switcher
│   ├── SummaryCard.js         → Dashboard Cards
│   ├── TopCategoriesChart.js  → Pie Chart Component
│   ├── TransactionForm.js     → Add/Edit Form
│   └── TransactionTable.js    → Data Table
├── context/
│   └── FinanceContext.js      → Global State Management
├── pages/
│   ├── Dashboard.js           → Main Dashboard View
│   ├── AddTransaction.js      → Add Transaction Page
│   └── TransactionHistory.js  → List + Filters
├── App.js                     → Root Component
└── index.js                   → Entry Point
```

---

## 🔧 Common Development Tasks

### Adding a New Category

**File:** `src/context/FinanceContext.js`

```javascript
const categories = {
  income: [
    // Add new income category
    { name: 'New Category', descriptions: ['Desc 1', 'Desc 2'] }
  ],
  expense: [
    // Add new expense category
    { name: 'New Category', descriptions: ['Desc 1', 'Desc 2'] }
  ]
};
```

---

### Changing Currency Format

**Files to Update:**
- `src/components/SummaryCard.js`
- `src/components/TransactionTable.js`
- `src/components/TransactionForm.js`
- `src/pages/Dashboard.js`

**Change Symbol:**
```javascript
// From
₹{amount.toLocaleString('en-IN')}

// To (for USD)
${amount.toLocaleString('en-US')}
```

---

### Modifying Default Mock Data Amounts

**File:** `src/context/FinanceContext.js`

```javascript
const amount = isIncome 
  ? Math.floor(Math.random() * 350000) + 35000  // Income range
  : Math.floor(Math.random() * 35000) + 1400;    // Expense range
```

---

### Adding New Dashboard Widget

**File:** `src/pages/Dashboard.js`

```jsx
{/* New Widget Section */}
<div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Widget Title
  </h2>
  {/* Widget Content */}
</div>
```

---

## 🎨 Customization Guide

### Change Color Scheme

**Primary Colors:** `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#YOUR_COLOR',
        }
      }
    }
  }
}
```

---

### Modify Card Styles

**File Pattern:** All components

```jsx
// Current style
className="bg-white rounded-xl shadow-lg p-6"

// Custom style example
className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6"
```

---

### Add New Chart Type

**Install:**
```bash
npm install react-chartjs-2 chart.js
```

**Create Component:**
```jsx
// src/components/NewChart.js
import { Line } from 'react-chartjs-2';

const NewChart = ({ data }) => {
  return <Line data={data} />;
};
```

---

## 🐛 Debugging Tips

### Check State Values

```javascript
// In any component using context
const { transactions, role, filters } = useFinance();
console.log({ transactions, role, filters });
```

---

### Verify LocalStorage

```javascript
// Browser console
localStorage.getItem('finance_transactions');
JSON.parse(localStorage.getItem('finance_role'));
```

---

### Test Context Methods

```javascript
// In browser console (while on app)
const context = useFinance();
context.addTransaction({
  description: 'Test',
  amount: 100,
  category: 'Other',
  type: 'expense',
  date: '2024-01-01'
});
```

---

## ⚡ Performance Tips

### Optimize Large Lists

```jsx
// Use React.memo for table rows
const TransactionRow = React.memo(({ transaction }) => {
  return <tr>...</tr>;
});
```

---

### Debounce Search Input

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchTerm]);
```

---

### Memoize Expensive Calculations

```jsx
const filteredTransactions = useMemo(() => {
  return transactions.filter(txn => {
    // Filter logic
  }).sort((a, b) => {
    // Sort logic
  });
}, [transactions, filters]);
```

---

## 🔌 Integration Points

### Add Backend API

**Replace localStorage with API calls:**

```javascript
// Current
localStorage.setItem('finance_transactions', JSON.stringify(transactions));

// With API
await fetch('/api/transactions', {
  method: 'POST',
  body: JSON.stringify(transactions)
});
```

---

### Add Authentication

**Add JWT handling:**

```javascript
// Store token
localStorage.setItem('token', jwtToken);

// Include in requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

### Add Real-time Updates

**Using WebSocket:**

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://your-api.com');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Update state
  };
  
  return () => ws.close();
}, []);
```

---

## 📊 Data Migration

### Export All Data

```javascript
const exportAllData = () => {
  const data = {
    transactions: JSON.parse(localStorage.getItem('finance_transactions')),
    role: localStorage.getItem('finance_role'),
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  // Download blob...
};
```

---

### Import Data

```javascript
const importData = (jsonData) => {
  const data = JSON.parse(jsonData);
  
  localStorage.setItem('finance_transactions', JSON.stringify(data.transactions));
  localStorage.setItem('finance_role', data.role);
  
  window.location.reload();
};
```

---

## 🧪 Testing Commands

### Run Tests

```bash
npm test
```

### Test Specific Component

```bash
npm test -- TransactionTable.test.js
```

### Check Coverage

```bash
npm test -- --coverage
```

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

Output: `build/` folder

---

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

### Deploy to Netlify

1. Drag & drop `build/` folder to netlify.com
2. Or connect GitHub repo

---

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

---

## 🔑 Environment Variables

### Create `.env` File

```
REACT_APP_API_URL=https://api.yourapp.com
REACT_APP_FEATURE_FLAG=true
```

### Access in Code

```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## 📝 Code Templates

### New Component Template

```jsx
import React from 'react';
import { useFinance } from '../context/FinanceContext';

const NewComponent = () => {
  const { transactions } = useFinance();
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Component Title
      </h2>
      {/* Content */}
    </div>
  );
};

export default NewComponent;
```

---

### New Page Template

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

const NewPage = () => {
  const navigate = useNavigate();
  const { role } = useFinance();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Page Title</h1>
      {/* Content */}
    </div>
  );
};

export default NewPage;
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| App not loading | Check console for errors, verify npm start |
| Changes not showing | Hard refresh (Ctrl+Shift+R) |
| State not persisting | Check localStorage enabled |
| Build failing | Delete node_modules, run npm install |
| Port 3000 in use | Kill process or use different port |

---

## 📚 Additional Resources

- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Chart.js:** https://chartjs.org
- **React Router:** https://reactrouter.com

---

**For detailed information, see:**
- [Technical Documentation](TECHNICAL_DOCS.md)
- [User Guide](USER_GUIDE.md)
- [Project Overview](../PROJECT.md)
