import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock Data with realistic financial transactions
const generateMockData = () => {
  const categories = {
    income: [
      { name: 'Salary', descriptions: ['Monthly Salary', 'Bi-weekly Paycheck', 'Base Salary', 'Regular Income'] },
      { name: 'Freelance', descriptions: ['Freelance Project', 'Client Payment', 'Consulting Fee', 'Design Work'] },
      { name: 'Investments', descriptions: ['Dividend Payment', 'Stock Sale', 'Investment Return', 'Portfolio Gain'] },
      { name: 'Gifts', descriptions: ['Birthday Gift', 'Holiday Gift', 'Cash Gift', 'Family Support'] },
      { name: 'Other', descriptions: ['Refund Received', 'Bonus Payment', 'Miscellaneous Income', 'Side Hustle'] }
    ],
    expense: [
      { name: 'Food', descriptions: ['Grocery Shopping', 'Restaurant Dinner', 'Lunch at Cafe', 'Supermarket', 'Fast Food', 'Coffee Shop'] },
      { name: 'Transport', descriptions: ['Gas Station', 'Uber Ride', 'Bus Ticket', 'Metro Card', 'Car Maintenance', 'Parking Fee'] },
      { name: 'Shopping', descriptions: ['Online Shopping', 'Clothing Store', 'Electronics Purchase', 'Home Decor', 'Sports Equipment'] },
      { name: 'Entertainment', descriptions: ['Movie Tickets', 'Concert Tickets', 'Netflix Subscription', 'Gym Membership', 'Streaming Service'] },
      { name: 'Bills', descriptions: ['Electric Bill', 'Water Bill', 'Internet Bill', 'Phone Bill', 'Gas Bill', 'HOA Fees'] },
      { name: 'Healthcare', descriptions: ['Doctor Visit', 'Pharmacy', 'Dental Checkup', 'Medical Insurance', 'Prescription'] },
      { name: 'Education', descriptions: ['Tuition Fee', 'Online Course', 'Books & Supplies', 'Training Program', 'Workshop'] }
    ]
  };

  const transactions = [];
  const today = new Date();
  
  // Generate transactions for last 6 months
  for (let i = 0; i < 50; i++) {
    const isIncome = Math.random() > 0.7;
    const type = isIncome ? 'income' : 'expense';
    const categoryList = categories[type];
    const selectedCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
    const category = selectedCategory.name;
    const descriptionList = selectedCategory.descriptions;
    const description = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));
    
    const amount = isIncome 
      ? Math.floor(Math.random() * 350000) + 35000
      : Math.floor(Math.random() * 35000) + 1400;
    
    transactions.push({
      id: `txn_${i + 1}`,
      date: date.toISOString().split('T')[0],
      description: description,
      category,
      type,
      amount,
      status: 'completed'
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : generateMockData();
  });
  
  const [role, setRole] = useState(() => {
    return localStorage.getItem('finance_role') || 'admin';
  });
  
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  // Transaction operations
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      status: 'completed'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev => 
      prev.map(txn => txn.id === id ? { ...txn, ...updatedData } : txn)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(txn => txn.id !== id));
  };

  // Get unique categories
  const getCategories = () => {
    const categories = new Set(transactions.map(t => t.category));
    return Array.from(categories).sort();
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         txn.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || txn.type === filters.type;
    const matchesCategory = filters.category === 'all' || txn.category === filters.category;
    
    return matchesSearch && matchesType && matchesCategory;
  }).sort((a, b) => {
    const order = filters.sortOrder === 'asc' ? 1 : -1;
    if (filters.sortBy === 'date') {
      return order * (new Date(a.date) - new Date(b.date));
    } else if (filters.sortBy === 'amount') {
      return order * (a.amount - b.amount);
    }
    return 0;
  });

  // Calculate summary
  const calculateSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      balance: totalIncome - totalExpense,
      income: totalIncome,
      expense: totalExpense
    };
  };

  const value = {
    transactions,
    role,
    filters,
    setFilters,
    setRole,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getCategories,
    filteredTransactions,
    calculateSummary
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
