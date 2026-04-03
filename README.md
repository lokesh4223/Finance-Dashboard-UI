# Finance Dashboard UI

A modern, responsive finance dashboard built with React.js and Tailwind CSS. This application demonstrates frontend development skills, UI design, and state management using mock data.

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards**: Real-time display of Total Balance, Income, and Expenses
- **Monthly Trend Chart**: Visual representation of income vs expenses over time
- **Top Spending Categories**: Pie chart showing expense breakdown by category
- **Financial Insights**: Key metrics like highest spending category, average expense, and savings rate

### 💳 Transaction Management
- **Comprehensive List**: View all transactions with date, amount, category, and type
- **Search Functionality**: Find transactions by description or category
- **Advanced Filtering**: Filter by type (income/expense), category, and date range
- **Sorting Options**: Sort by date and amount in ascending/descending order
- **Export Data**: Download transactions as JSON files

### 👥 Role-Based Access Control
- **Admin Role**: Full access to add, edit, and delete transactions
- **Viewer Role**: Read-only access to view financial data
- **Role Switcher**: Easy toggle between roles in the navbar

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Empty States**: User-friendly messages when no data is available

### 💾 State Management
- **Context API**: Global state management for transactions, filters, and user preferences
- **LocalStorage Persistence**: All data persists across browser sessions
- **Mock Data Generator**: Auto-generates realistic financial transactions

## 🏗️ Project Structure

```
finance-dashboard/
├── public/                     # Static files
│   ├── screenshots/            # Application screenshots
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.js           # Navigation with role switcher & dark mode
│   │   ├── SummaryCard.js      # Dashboard summary cards
│   │   ├── TopCategoriesChart.js # Category-wise expense chart
│   │   ├── TransactionForm.js  # Add/Edit transaction form
│   │   └── TransactionTable.js # Transaction list table
│   │
│   ├── context/                # React Context
│   │   └── FinanceContext.js   # Global state management
│   │
│   ├── pages/                  # Application views
│   │   ├── Dashboard.js        # Main dashboard with charts
│   │   ├── AddTransaction.js   # Add new transaction page
│   │   └── TransactionHistory.js # Transaction list with filters
│   │
│   ├── App.js                  # Main application component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles with Tailwind
├── package.json
├── README.md
├── tailwind.config.js
└── craco.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v8 or later) or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode with hot reload.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## 📋 Core Requirements Fulfilled

### ✅ 1. Dashboard Overview
- [x] Total Balance, Income, and Expense summary cards
- [x] Time-based trend chart (monthly income vs expenses)
- [x] Category-based pie chart (spending breakdown)

### ✅ 2. Transactions Section
- [x] Transaction list with Date, Amount, Category, Type
- [x] Search functionality
- [x] Filtering by type, category, and date range
- [x] Sorting by date and amount

### ✅ 3. Role-Based UI
- [x] Viewer role (read-only access)
- [x] Admin role (can add/edit/delete transactions)
- [x] Role switcher dropdown in navbar

### ✅ 4. Insights Section
- [x] Highest spending category
- [x] Monthly comparison
- [x] Average expense calculation
- [x] Savings rate percentage

### ✅ 5. State Management
- [x] Context API for global state
- [x] Transactions management
- [x] Filters state
- [x] Selected role state
- [x] Dark mode preference

### ✅ 6. UI/UX Expectations
- [x] Clean and readable design
- [x] Fully responsive layout
- [x] Empty state handling
- [x] Smooth animations and transitions

## 🎯 Optional Enhancements Implemented

- [x] **Dark Mode**: Full theme support with localStorage persistence
- [x] **Local Storage**: Complete data persistence across sessions
- [x] **Export Data**: Download transactions as JSON
- [x] **Animations**: Hover effects, transitions, and loading states
- [x] **Advanced Filters**: Multi-criteria filtering
- [x] **Mock Data Generator**: Auto-generates 50+ realistic transactions

## 🎨 Design Highlights

- **Color Palette**: Professional blue accents with semantic colors (green for income, red for expenses)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Icons**: React Icons library for consistent iconography
- **Charts**: Custom-built bar charts and Chart.js doughnut charts

## 📦 Dependencies

- **React** (v18.2.0): UI framework
- **React Router DOM** (v6.22.1): Routing
- **Tailwind CSS** (v3.4.17): Styling
- **Chart.js** (v4.4.1): Data visualization
- **React Icons** (v5.5.5): Icon library
- **CRACO** (v7.1.0): Configuration override

## 🔧 Configuration

### Tailwind Config
The project uses Tailwind CSS for styling with custom dark mode support enabled via class strategy.

### CRACO Configuration
Custom React App Configuration is handled via CRACO for advanced Tailwind integration.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
