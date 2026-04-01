import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import SummaryCard from '../components/SummaryCard';
import TransactionTable from '../components/TransactionTable';
import TopCategoriesChart from '../components/TopCategoriesChart';

const Dashboard = ({ transactions = [] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [topCategories, setTopCategories] = useState([]);

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      const income = transactions
        .filter((tx) => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

      const expenses = transactions
        .filter((tx) => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

      setSummary({ totalIncome: income, totalExpenses: expenses, balance: income - expenses });

      const categoryMap = {};
      transactions
        .filter((tx) => tx.type === 'expense')
        .forEach((tx) => {
          categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
        });

      const categories = Object.entries(categoryMap)
        .map(([category, amount]) => ({ category, amount: parseFloat(amount.toFixed(2)) }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      setTopCategories(categories);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="win-loading">
        <div className="win-hourglass">&#x231B;</div>
        <span>Loading data, please wait...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Page heading — Win2000 style address / breadcrumb bar */}
      <div
        className="win-raised"
        style={{
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>&#x1F4CA;</span>
        <span>Dashboard</span>
        <span style={{ color: '#888', fontWeight: 'normal', fontSize: '11px' }}>
          &mdash; {transactions.length} transaction(s) loaded
        </span>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '6px',
        }}
      >
        <SummaryCard
          title="Total Income"
          amount={summary.totalIncome.toFixed(2)}
          change={5.2}
          icon={FaArrowUp}
          trend="up"
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.totalExpenses.toFixed(2)}
          change={2.7}
          icon={FaArrowDown}
          trend="down"
        />
        <SummaryCard
          title="Current Balance"
          amount={summary.balance.toFixed(2)}
          change={3.8}
          icon={FaWallet}
          trend={summary.balance >= 0 ? 'up' : 'down'}
        />
      </div>

      {/* Bottom two panels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          alignItems: 'start',
        }}
      >
        {/* Recent Transactions panel */}
        <div className="win-window">
          <div className="win-titlebar" style={{ fontSize: '10px', padding: '2px 4px 2px 6px' }}>
            <span>Recent Transactions</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <span className="win-titlebar-btn" style={{ fontSize: '8px' }}>_</span>
              <span className="win-titlebar-btn" style={{ fontSize: '8px' }}>&#9633;</span>
            </div>
          </div>
          <div style={{ padding: '4px', backgroundColor: 'var(--win-face)' }}>
            <TransactionTable transactions={recentTransactions} showCategory={true} />
          </div>
          <div className="win-statusbar">
            <span>Showing last {recentTransactions.length} transactions</span>
          </div>
        </div>

        {/* Top Categories */}
        <div style={{ minHeight: '200px' }}>
          <TopCategoriesChart data={topCategories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
