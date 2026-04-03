# Finance Dashboard - User Guide

## Quick Start Guide

### Getting Started in 3 Steps

1. **Open the Application**
   - Navigate to your deployed URL or run `npm start` locally
   - Application opens on the Dashboard page

2. **Choose Your Role**
   - Use the dropdown in the top-right corner
   - Select **Admin** for full access or **Viewer** for read-only

3. **Start Managing Finances**
   - View dashboard overview
   - Add transactions (Admin only)
   - Filter and analyze data

---

## Dashboard Overview

### What You'll See

#### Summary Cards (Top Section)
Three cards showing:
- 💰 **Total Balance**: Current net balance
- 📈 **Total Income**: Sum of all income
- 📉 **Total Expenses**: Sum of all expenses

#### Charts Section (Middle)
Two visualizations:
1. **Monthly Trend Chart**
   - Bar chart showing last 6 months
   - Green bars = Income
   - Red bars = Expenses
   - Hover to see exact amounts

2. **Top Categories Chart**
   - Pie/doughnut chart
   - Shows top 5 expense categories
   - Hover for percentages

#### Recent Transactions (Below Charts)
- Last 5 transactions
- Quick view of recent activity
- Shows description, date, category, amount

#### Financial Insights (Bottom)
Three key metrics:
- 📊 Highest Spending Category
- 💰 Average Expense
- 🎯 Savings Rate (%)

---

## Managing Transactions

### Adding a New Transaction (Admin Only)

**Step-by-Step:**

1. Click **"Add Transaction"** in navbar
2. Fill out the form:

   ```
   Description: e.g., "Grocery Shopping at BigBasket"
   Amount:      e.g., 4500
   Category:    Select from dropdown (Food, Transport, etc.)
   Type:        Choose Income or Expense
   Date:        Pick date from calendar
   ```

3. Click **"Add Transaction"** button
4. Success! You're redirected to Dashboard

**Tips:**
- Be specific in descriptions
- Use correct categories for better insights
- Amounts are in Indian Rupee (₹)

---

### Editing a Transaction (Admin Only)

**Steps:**

1. Go to **"Transactions"** page
2. Find the transaction you want to edit
3. Click the **✏️ Edit** icon
4. Modify the details
5. Click **"Update Transaction"**

**Note:** Only visible when you're in Admin role

---

### Deleting a Transaction (Admin Only)

**Steps:**

1. Go to **"Transactions"** page
2. Find the transaction
3. Click the **🗑️ Delete** icon
4. Confirm deletion in popup
5. Transaction is removed

**Warning:** This action cannot be undone!

---

## Using Filters & Search

### Search Functionality

**How to Search:**

1. Locate search bar at top of Transactions page
2. Type keywords (e.g., "grocery", "salary")
3. Results filter automatically as you type

**What it searches:**
- Transaction descriptions
- Category names

**Example:**
```
Search: "uber"
Shows: All Uber ride transactions
```

---

### Filtering Options

**Filter by Type:**
1. Click **Type** dropdown
2. Choose:
   - All Types
   - Income
   - Expense

**Filter by Category:**
1. Click **Category** dropdown
2. Select specific category
3. Shows only transactions in that category

**Filter by Date Range:**
1. Set **From Date** (start date)
2. Set **To Date** (end date)
3. Shows transactions within range

**Combine Filters:**
- Use multiple filters together
- Example: Food expenses in January 2024

---

### Sorting Data

**Sortable Columns:**
- Description
- Date
- Category
- Amount

**How to Sort:**
1. Click column header
2. First click = Ascending order
3. Second click = Descending order
4. Arrow shows sort direction

---

## Role-Based Features

### Admin Role (Full Access)

**What You Can Do:**
✅ View all data
✅ Add new transactions
✅ Edit existing transactions
✅ Delete transactions
✅ Use all filters and search
✅ Export data to JSON

**UI Indicators:**
- Edit/Delete buttons visible in tables
- "Add Transaction" button enabled
- Full form access

---

### Viewer Role (Read-Only)

**What You Can Do:**
✅ View all data
✅ Use filters and search
✅ Export data to JSON
❌ Cannot add transactions
❌ Cannot edit transactions
❌ Cannot delete transactions

**UI Indicators:**
- No Edit/Delete buttons
- "Add Transaction" shows permission denied message

---

## Exporting Data

### Download Transactions as JSON

**Steps:**

1. Go to **"Transactions"** page
2. Apply any desired filters (optional)
3. Click **"Export JSON"** button (top-right)
4. File downloads automatically
5. Open with any text editor or import tool

**File Format:**
```json
[
  {
    "id": "txn_1",
    "description": "Grocery Shopping",
    "amount": 4500,
    "category": "Food",
    "type": "expense",
    "date": "2024-01-15"
  }
]
```

**Use Cases:**
- Backup your data
- Import to spreadsheet software
- Share with accountant
- Analyze in other tools

---

## Tips & Best Practices

### Daily Usage

1. **Record Transactions Immediately**
   - Add expenses as they happen
   - Prevents forgetting small purchases
   - Keeps data accurate

2. **Use Consistent Descriptions**
   - Makes searching easier
   - Helps identify patterns
   - Example: Always use "Salary - [Company]" for income

3. **Categorize Correctly**
   - Choose most specific category
   - Don't put everything in "Other"
   - Better categories = better insights

---

### Weekly Review

1. **Check Dashboard Insights**
   - Review spending patterns
   - Compare income vs expenses
   - Identify high-spending categories

2. **Use Filters to Analyze**
   - Filter by category to see totals
   - Check weekly trends
   - Review large expenses

---

### Monthly Analysis

1. **Review Monthly Trend Chart**
   - Compare with previous months
   - Identify seasonal patterns
   - Track progress toward goals

2. **Export and Backup**
   - Download monthly data
   - Keep records for tax purposes
   - Create personal financial reports

---

## Troubleshooting

### Common Issues

**Issue:** Can't add transactions  
**Solution:** Make sure you're in Admin role (use role switcher)

**Issue:** Changes not saving  
**Solution:** Check browser localStorage is enabled

**Issue:** Data disappeared  
**Solution:** 
- Try refreshing page
- Check if you cleared browser cache
- Data persists in localStorage automatically

**Issue:** Search not working  
**Solution:** 
- Clear search box and try again
- Check spelling
- Try different keywords

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Focus Search | Click search bar |
| Submit Form | Enter key |
| Reset Form | Click Reset button |

---

## Mobile Usage

### Responsive Features

**Mobile Layout (< 640px):**
- Single column layout
- Stacked cards
- Hamburger menu (if implemented)
- Touch-friendly buttons

**Tablet Layout (640-1024px):**
- Two-column grid
- Side-by-side charts
- Optimized touch targets

**Desktop (> 1024px):**
- Full multi-column layout
- All features visible
- Hover effects active

---

## Privacy & Data

### Where Your Data is Stored

**LocalStorage:**
- All data stored in your browser
- Never sent to external servers
- Persists across sessions
- Specific to browser/device

**Implications:**
- ✅ Complete privacy
- ✅ No server downtime
- ❌ Not accessible from other devices
- ❌ Lost if browser cache cleared

### Backup Recommendations

1. **Regular Exports:**
   - Export data weekly/monthly
   - Save JSON files securely
   - Keep multiple backups

2. **Browser Sync:**
   - Enable browser sync feature
   - Backs up localStorage
   - Allows cross-device access

---

## Frequently Asked Questions

### Q: Can I access my data from multiple devices?
**A:** No, data is stored locally in one browser. Export and import manually if needed.

### Q: Is my financial data secure?
**A:** Yes, it never leaves your browser. However, anyone with access to your device can see it.

### Q: Can I customize categories?
**A:** Currently categories are predefined. Custom categories may be added in future updates.

### Q: How many transactions can I add?
**A:** No limit, but performance may decrease with very large datasets (1000+ transactions).

### Q: Can I undo a deletion?
**A:** No, deletions are permanent. Export data regularly for backup.

### Q: Does this work offline?
**A:** Yes, once loaded, all features work without internet connection.

---

## Getting Help

### Need Assistance?

1. **Check this guide first**
2. **Try troubleshooting section**
3. **Review technical documentation**
4. **Contact support** (if available)

### Report a Bug

If you find an issue:
1. Note what you were doing
2. Take a screenshot
3. Describe expected vs actual behavior
4. Report to developer

---

## Updates & Changelog

### Version 1.0.0 (Current)
- ✅ Dashboard with summary cards
- ✅ Transaction management (CRUD)
- ✅ Role-based access control
- ✅ Search and filtering
- ✅ Data export
- ✅ Recent transactions display
- ✅ Financial insights
- ✅ Indian Rupee formatting
- ✅ Responsive design

---

**Need more help?** Check the [Technical Documentation](docs/TECHNICAL_DOCS.md) or [Project Overview](PROJECT.md)
