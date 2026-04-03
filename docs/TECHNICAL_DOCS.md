# Finance Dashboard - Technical Documentation

## Table of Contents
1. [Component Specifications](#component-specifications)
2. [API Reference](#api-reference)
3. [State Management](#state-management)
4. [Styling Guide](#styling-guide)
5. [Performance Optimization](#performance-optimization)

---

## Component Specifications

### Navbar Component

**File:** `src/components/Navbar.js`

**Purpose:** Main navigation bar with role switcher

**Props:** None (uses Context)

**State:**
```javascript
const { role, setRole } = useFinance();
```

**Features:**
- Navigation links (Dashboard, Add Transaction, Transactions)
- Role dropdown selector
- Active route highlighting
- Responsive mobile menu

**Code Example:**
```jsx
<Navbar />
```

---

### SummaryCard Component

**File:** `src/components/SummaryCard.js`

**Purpose:** Display financial summary metrics

**Props:**
```javascript
{
  title: string,      // Card title
  amount: number,     // Amount to display
  icon: ReactNode,    // Icon component
  color: string,      // 'blue' | 'green' | 'red'
  trend: string       // 'stable' | 'positive' | 'negative'
}
```

**Features:**
- Color-coded backgrounds
- Icon display
- Indian Rupee formatting
- Hover effects

**Usage:**
```jsx
<SummaryCard 
  title="Total Balance"
  amount={125000}
  icon={FaWallet}
  color="blue"
/>
```

---

### TransactionTable Component

**File:** `src/components/TransactionTable.js`

**Purpose:** Display list of transactions in table format

**Props:**
```javascript
{
  transactions: array,    // Array of transaction objects
  showCategory: boolean,  // Show/hide category column
  onEdit: function,       // Edit handler (Admin only)
  onDelete: function,     // Delete handler (Admin only)
  isAdmin: boolean        // Admin role flag
}
```

**Features:**
- Sortable columns
- Edit/Delete actions
- Color-coded amounts
- Category badges
- Responsive layout

**Usage:**
```jsx
<TransactionTable 
  transactions={transactions}
  showCategory={true}
  isAdmin={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

### TransactionForm Component

**File:** `src/components/TransactionForm.js`

**Purpose:** Form for adding/editing transactions

**Props:**
```javascript
{
  onSubmit: function,      // Form submit handler
  initialData: object      // Pre-fill data for editing
}
```

**Form Fields:**
- Description (text input)
- Amount (number input with ₹ symbol)
- Category (dropdown)
- Type (Income/Expense dropdown)
- Date (date picker)

**Validation:**
- All fields required
- Amount must be positive number
- Date must be valid

**Usage:**
```jsx
<TransactionForm 
  onSubmit={handleSubmit}
  initialData={{}}
/>
```

---

## API Reference

### Context API Methods

#### FinanceContext

**Location:** `src/context/FinanceContext.js`

**Provider:** FinanceProvider

**Hook:** useFinance()

### Methods

#### addTransaction(transaction)
Add new transaction to the list.

**Parameters:**
```javascript
{
  description: string,
  amount: number,
  category: string,
  type: 'income' | 'expense',
  date: string (ISO format)
}
```

**Example:**
```javascript
const { addTransaction } = useFinance();

addTransaction({
  description: 'Freelance Work',
  amount: 50000,
  category: 'Freelance',
  type: 'income',
  date: '2024-01-15'
});
```

---

#### updateTransaction(id, updatedData)
Update existing transaction.

**Parameters:**
- `id` (string): Transaction ID
- `updatedData` (object): Fields to update

**Example:**
```javascript
updateTransaction('txn_1', {
  amount: 6000,
  description: 'Grocery Shopping - Updated'
});
```

---

#### deleteTransaction(id)
Remove transaction from list.

**Parameters:**
- `id` (string): Transaction ID to delete

**Example:**
```javascript
deleteTransaction('txn_1');
```

---

#### calculateSummary()
Calculate financial summary.

**Returns:**
```javascript
{
  balance: number,
  income: number,
  expense: number
}
```

**Usage:**
```javascript
const { calculateSummary } = useFinance();
const summary = calculateSummary();
console.log(summary.balance); // 125000
```

---

#### getCategories()
Get unique categories from transactions.

**Returns:**
```javascript
['Food', 'Transport', 'Salary', ...]
```

**Usage:**
```javascript
const categories = getCategories();
```

---

## State Management

### Global State Structure

```javascript
{
  // Data State
  transactions: [],
  
  // UI State
  role: 'admin' | 'viewer',
  
  // Filter State
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  }
}
```

### State Flow Diagram

```
User Action
    ↓
Component Event Handler
    ↓
Context Method
    ↓
State Update
    ↓
LocalStorage Persistence
    ↓
Component Re-render
```

### LocalStorage Keys

```javascript
localStorage.setItem('finance_transactions', JSON.stringify(transactions));
localStorage.setItem('finance_role', role);
```

---

## Styling Guide

### Tailwind CSS Classes

#### Common Patterns

**Cards:**
```html
<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
  <!-- Content -->
</div>
```

**Buttons:**
```html
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  Click Me
</button>
```

**Inputs:**
```html
<input 
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text"
/>
```

**Text Colors:**
```javascript
// Primary Text
text-gray-800

// Secondary Text
text-gray-600

// Muted Text
text-gray-500

// Success (Income)
text-green-600

// Danger (Expense)
text-red-600
```

**Background Colors:**
```javascript
// Page Background
bg-gray-50

// Card Background
bg-white

// Accent Backgrounds
bg-blue-100
bg-green-100
bg-red-100
```

### Responsive Utilities

```html
<!-- Mobile-first approach -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <!-- Columns stack on mobile, 3 columns on desktop -->
</div>
```

**Breakpoint Prefixes:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

---

## Performance Optimization

### Techniques Used

#### 1. Memoization

```javascript
import { useMemo } from 'react';

const chartData = useMemo(() => ({
  labels: categories.map(item => item.category),
  datasets: [{
    data: categories.map(item => item.amount)
  }]
}), [categories]);
```

#### 2. Debounced Search

```javascript
import { useEffect } from 'react';

useEffect(() => {
  const timer = setTimeout(() => {
    // Apply search filter
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchTerm]);
```

#### 3. Conditional Rendering

```javascript
{isAdmin && (
  <button onClick={handleDelete}>Delete</button>
)}
```

#### 4. Code Splitting

```javascript
// Lazy load heavy components
const TransactionHistory = lazy(() => import('./pages/TransactionHistory'));
```

### Bundle Size Optimization

**Webpack Configuration (via CRACO):**
```javascript
module.exports = {
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      }
    }
  }
};
```

### Best Practices Followed

✅ Use React.memo for pure components  
✅ Implement useMemo for expensive calculations  
✅ Use useCallback for event handlers  
✅ Lazy load routes and heavy components  
✅ Optimize images and assets  
✅ Minimize re-renders  

---

## Error Handling

### Form Validation

```javascript
const validateForm = () => {
  if (!description.trim()) {
    setError('Description is required');
    return false;
  }
  if (amount <= 0) {
    setError('Amount must be greater than 0');
    return false;
  }
  return true;
};
```

### Try-Catch Blocks

```javascript
try {
  addTransaction(transaction);
} catch (error) {
  console.error('Error adding transaction:', error);
  setError('Failed to add transaction');
}
```

### Boundary Components

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
```

---

## Browser Compatibility

### Supported Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest 2 versions | ✅ Full Support |
| Firefox | Latest 2 versions | ✅ Full Support |
| Safari | Latest 2 versions | ✅ Full Support |
| Edge | Latest 2 versions | ✅ Full Support |
| IE 11 | - | ❌ Not Supported |

### Polyfills Required

- Fetch API (built-in modern browsers)
- Promise (built-in ES6+)
- Object.assign (built-in ES6+)

---

## Security Considerations

### Client-Side Security

1. **Input Sanitization:**
   ```javascript
   const sanitized = description.replace(/<script>/g, '');
   ```

2. **XSS Prevention:**
   - React automatically escapes content
   - No dangerouslySetInnerHTML used

3. **CSRF Protection:**
   - Not applicable (no backend)

4. **Data Validation:**
   - All inputs validated before state update
   - Type checking on form submissions

---

## Testing Guidelines

### Unit Tests (Jest)

```javascript
describe('calculateSummary', () => {
  it('should calculate correct balance', () => {
    const transactions = [
      { type: 'income', amount: 10000 },
      { type: 'expense', amount: 3000 }
    ];
    
    const result = calculateSummary(transactions);
    expect(result.balance).toBe(7000);
  });
});
```

### Component Tests (React Testing Library)

```javascript
test('displays total income correctly', () => {
  render(<SummaryCard title="Income" amount={50000} />);
  expect(screen.getByText('₹50,000')).toBeInTheDocument();
});
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run build`
- [ ] Test production build locally
- [ ] Check all routes work
- [ ] Verify localStorage persistence
- [ ] Test on multiple browsers
- [ ] Check responsive design
- [ ] Validate all forms
- [ ] Test role switching
- [ ] Verify export functionality

### Post-Deployment

- [ ] Verify live site works
- [ ] Check console for errors
- [ ] Test all features in production
- [ ] Monitor performance metrics

---

**Last Updated:** January 2024  
**Version:** 1.0.0
