# Finance Dashboard UI

A modern, responsive finance dashboard built with React.js and Tailwind CSS. This application demonstrates frontend development skills, UI design, and state management using mock data.

![Finance Dashboard](https://raw.githubusercontent.com/lokesh4223/Finance-Dashboard-UI/main/public/screenshots/dashboard.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Core Functionalities](#core-functionalities)
- [API & Data Structure](#api--data-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Finance Dashboard UI is a comprehensive personal finance management tool that allows users to track income, expenses, and analyze spending patterns. Built as a frontend-only application with mock data, it showcases modern React development practices, responsive design, and effective state management.

### Key Highlights
- **Role-Based Access**: Admin (full access) and Viewer (read-only) modes
- **Real-Time Updates**: Instant transaction management with localStorage persistence
- **Indian Currency**: All amounts displayed in Indian Rupee (₹)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean interface with smooth animations and intuitive navigation

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards**: Real-time display of Total Balance, Income, and Expenses with Indian Rupee formatting
- **Monthly Trend Chart**: Visual representation of income vs expenses over the last 6 months
- **Top Spending Categories**: Interactive pie chart showing expense breakdown by category using Chart.js
- **Recent Transactions**: Quick view of the 5 most recent transactions
- **Financial Insights**: Key metrics including highest spending category, average expense, and savings rate percentage

### 💳 Transaction Management
- **Comprehensive List**: View all transactions with description, date, amount, category, and type
- **Search Functionality**: Find transactions by description or category name
- **Advanced Filtering**: Filter by type (income/expense), category, and date range
- **Sorting Options**: Sort by date or amount in ascending/descending order
- **Export Data**: Download all transactions as JSON files
- **CRUD Operations**: Add, edit, and delete transactions (Admin only)

### 👥 Role-Based Access Control
- **Admin Role**: Full access to add, edit, and delete transactions
- **Viewer Role**: Read-only access to view financial data and insights
- **Role Switcher**: Easy toggle between roles via dropdown in navbar
- **Permission Enforcement**: UI elements automatically adjust based on role

### 🎨 UI/UX Features
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Empty States**: User-friendly messages when no data is available
- **Form Validation**: Client-side validation for transaction inputs
- **Toast Notifications**: Success/error messages for user actions

### 💾 State Management & Persistence
- **Context API**: Global state management for transactions, filters, and user preferences
- **LocalStorage Persistence**: All data persists across browser sessions automatically
- **Mock Data Generator**: Auto-generates 50+ realistic financial transactions on first load
- **Filter State**: Preserves filter and sort preferences during session

## 🛠️ Tech Stack

### Frontend
- **React** (v18.2.0): UI framework with hooks and functional components
- **React Router DOM** (v6.22.1): Client-side routing and navigation
- **Tailwind CSS** (v3.4.17): Utility-first CSS framework for styling
- **Chart.js** (v4.4.1): Data visualization library for charts
- **React Chartjs-2** (v5.2.0): React wrapper for Chart.js
- **React Icons** (v5.5.0): Icon library with 1000+ icons

### Build Tools & Configuration
- **CRACO** (v7.1.0): Configuration override for Create React App
- **PostCSS** (v8.5.6): CSS processing tool
- **Autoprefixer** (v10.4.21): Automatic vendor prefixing

### Development
- **Create React App**: Project scaffolding
- **Webpack**: Module bundler (via CRA)
- **Babel**: JavaScript compiler

### State Management
- **React Context API**: Global state management
- **LocalStorage**: Client-side data persistence

## 📁 Project Structure

```
finance-dashboard/
├── public/                         # Static files
│   ├── screenshots/                # Application screenshots
│   ├── favicon.ico                 # Browser icon
│   ├── index.html                  # HTML template
│   └── manifest.json               # PWA manifest
│
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.js               # Navigation bar with role switcher
│   │   ├── SummaryCard.js          # Dashboard summary cards
│   │   ├── TopCategoriesChart.js   # Category-wise expense pie chart
│   │   ├── TransactionForm.js      # Add/Edit transaction form
│   │   └── TransactionTable.js     # Transaction list table
│   │
│   ├── context/                    # React Context
│   │   └── FinanceContext.js       # Global state management
│   │
│   ├── pages/                      # Application views
│   │   ├── Dashboard.js            # Main dashboard with charts & insights
│   │   ├── AddTransaction.js       # Add new transaction page
│   │   └── TransactionHistory.js   # Transaction list with filters
│   │
│   ├── App.js                      # Main application component
│   ├── index.js                    # Entry point
│   └── index.css                   # Global styles with Tailwind
│
├── package.json                    # Dependencies and scripts
├── README.md                       # This file
├── tailwind.config.js              # Tailwind configuration
└── craco.config.js                 # CRACO configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **npm** (v8 or later) or Yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lokesh4223/Finance-Dashboard-UI.git
   cd Finance-Dashboard-UI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Create production build in `build/` folder |
| `npm test` | Launch test runner in interactive watch mode |
| `npm run eject` | Eject from Create React App (one-way operation) |

## 🎯 Core Functionalities

### 1. Dashboard Overview
The main dashboard provides a comprehensive view of your financial status:

- **Summary Cards**: Display total balance, income, and expenses
- **Monthly Trend Chart**: Bar chart showing income vs expenses for last 6 months
- **Top Categories**: Pie chart displaying top 5 expense categories
- **Recent Transactions**: Table showing 5 most recent transactions
- **Insights Panel**: Key metrics and financial observations

### 2. Transaction Management

#### Adding Transactions (Admin Only)
1. Click "Add Transaction" in navbar
2. Fill in the form:
   - Description (e.g., "Grocery Shopping")
   - Amount (₹)
   - Category (Food, Transport, etc.)
   - Type (Income/Expense)
   - Date
3. Click "Add Transaction" button

#### Editing Transactions (Admin Only)
1. Navigate to "Transactions" page
2. Click edit icon (✏️) on desired transaction
3. Modify details
4. Save changes

#### Deleting Transactions (Admin Only)
1. Navigate to "Transactions" page
2. Click delete icon (🗑️) on desired transaction
3. Confirm deletion

### 3. Filtering & Searching

**Search:**
- Enter keywords in search bar
- Searches description and category fields

**Filters:**
- **Type**: All, Income, or Expense
- **Category**: Select from available categories
- **Date Range**: From date and To date

**Sorting:**
- Click column headers to sort
- Toggle between ascending/descending order

### 4. Role-Based Access

**Switch Roles:**
1. Use role dropdown in navbar
2. Select "Viewer" or "Admin"
3. UI automatically adjusts permissions

**Admin Features:**
- Add new transactions
- Edit existing transactions
- Delete transactions

**Viewer Features:**
- View all data
- Use filters and search
- Export data
- No editing capabilities

## 📋 Core Requirements Fulfilled

### ✅ 1. Dashboard Overview
- [x] Total Balance, Income, and Expense summary cards
- [x] Time-based trend chart (monthly income vs expenses - 6 months)
- [x] Category-based pie chart (spending breakdown)
- [x] Recent transactions display
- [x] Financial insights section

### ✅ 2. Transactions Section
- [x] Transaction list with Description, Date, Amount, Category, Type
- [x] Search functionality across description and category
- [x] Filtering by type, category, and date range
- [x] Sorting by date and amount (ascending/descending)
- [x] Export to JSON functionality

### ✅ 3. Role-Based UI
- [x] Viewer role (read-only access)
- [x] Admin role (full CRUD operations)
- [x] Role switcher dropdown in navbar
- [x] Permission-based UI rendering

### ✅ 4. Insights Section
- [x] Highest spending category identification
- [x] Average expense calculation
- [x] Savings rate percentage
- [x] Real-time metric updates

### ✅ 5. State Management
- [x] Context API for global state
- [x] Transactions management
- [x] Filters state management
- [x] Selected role state
- [x] LocalStorage persistence

### ✅ 6. UI/UX Expectations
- [x] Clean and readable design
- [x] Fully responsive layout (mobile, tablet, desktop)
- [x] Empty state handling
- [x] Smooth animations and transitions
- [x] Form validation
- [x] Loading states

## 🎯 Optional Enhancements Implemented

- [x] **Indian Rupee Formatting**: All amounts displayed as ₹ with Indian number formatting
- [x] **Local Storage**: Complete data persistence across sessions
- [x] **Export Data**: Download transactions as JSON
- [x] **Animations**: Hover effects, transitions, and loading states
- [x] **Advanced Filters**: Multi-criteria filtering
- [x] **Mock Data Generator**: Auto-generates 50+ realistic transactions
- [x] **Recent Transactions**: Quick view on dashboard
- [x] **Enhanced Descriptions**: Realistic transaction names per category

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

---

## 📚 Documentation

For detailed information, check out our comprehensive documentation:

- **[Project Overview](PROJECT.md)** - Complete project details, architecture, and specifications
- **[Technical Documentation](docs/TECHNICAL_DOCS.md)** - In-depth technical guide for developers
- **[User Guide](docs/USER_GUIDE.md)** - Step-by-step instructions for end users
- **[Developer Quick Reference](docs/DEVELOPER_QUICKREF.md)** - Quick commands and code templates

### Documentation Contents:

**Project Overview (PROJECT.md):**
- Project objectives and success criteria
- Architecture diagrams and component hierarchy
- Data structures and schemas
- Design system and style guide
- Testing strategy and deployment options

**Technical Docs (docs/TECHNICAL_DOCS.md):**
- Component specifications
- API reference and context methods
- State management details
- Performance optimization techniques
- Security considerations

**User Guide (docs/USER_GUIDE.md):**
- Getting started tutorial
- Feature walkthrough
- How-to guides for all tasks
- Troubleshooting common issues
- FAQ section

**Developer Quick Reference (docs/DEVELOPER_QUICKREF.md):**
- Common development tasks
- Customization guide
- Debugging tips
- Code templates
- Integration examples
