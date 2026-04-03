import React from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/SummaryCard';
import TopCategoriesChart from '../components/TopCategoriesChart';
import TransactionTable from '../components/TransactionTable';
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const { calculateSummary, transactions } = useFinance();
  const summary = calculateSummary();
  


  // Calculate monthly data for trend chart
  const getMonthlyData = () => {
    const monthlyData = {};
    
    transactions.forEach(txn => {
      const month = txn.date.substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (txn.type === 'income') {
        monthlyData[month].income += txn.amount;
      } else {
        monthlyData[month].expense += txn.amount;
      }
    });
    
    return Object.entries(monthlyData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense
      }));
  };

  // Get top spending categories
  const getTopCategories = () => {
    const categorySpending = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(txn => {
        categorySpending[txn.category] = (categorySpending[txn.category] || 0) + txn.amount;
      });
    
    return Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, amount]) => ({ category, amount }));
  };

  // Calculate insights
  const getInsights = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const categorySpending = {};
    expenses.forEach(txn => {
      categorySpending[txn.category] = (categorySpending[txn.category] || 0) + txn.amount;
    });
    
    const topCategory = Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])[0];
    
    const avgExpense = expenses.length > 0 
      ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length 
      : 0;
    
    const savingsRate = summary.income > 0 
      ? ((summary.income - summary.expense) / summary.income * 100).toFixed(1)
      : 0;
    
    return [
      {
        title: 'Highest Spending',
        value: topCategory ? `${topCategory[0]} (₹${topCategory[1].toLocaleString('en-IN')})` : 'N/A',
        icon: '📊'
      },
      {
        title: 'Avg Expense',
        value: `₹${Math.round(avgExpense).toLocaleString('en-IN')}`,
        icon: '💰'
      },
      {
        title: 'Savings Rate',
        value: `${savingsRate}%`,
        icon: '🎯'
      }
    ];
  };

  const insights = getInsights();
  const monthlyData = getMonthlyData();
  const topCategories = getTopCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FaChartLine />
          <span>Last 6 months</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          amount={summary.balance}
          icon={FaWallet}
          color="blue"
          trend="stable"
        />
        <SummaryCard
          title="Total Income"
          amount={summary.income}
          icon={FaArrowUp}
          color="green"
          trend="positive"
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.expense}
          icon={FaArrowDown}
          color="red"
          trend="negative"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Trend
          </h2>
          <div className="h-64">
            {monthlyData.length > 0 ? (
              <div className="flex items-end justify-between h-full space-x-2">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex space-x-1 items-end h-48">
                      <div
                        className="bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                        style={{
                          height: `${(data.income / Math.max(...monthlyData.map(d => d.income))) * 100}%`,
                          width: '45%'
                        }}
                        title={`Income: $${data.income.toLocaleString()}`}
                      ></div>
                      <div
                        className="bg-red-500 rounded-t transition-all duration-300 hover:bg-red-600"
                        style={{
                          height: `${(data.expense / Math.max(...monthlyData.map(d => d.expense))) * 100}%`,
                          width: '45%'
                        }}
                        title={`Expense: $${data.expense.toLocaleString()}`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">
                      {data.month.substring(5)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data available
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Expense</span>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <TopCategoriesChart categories={topCategories} />
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaHistory className="mr-2" />
            Recent Transactions
          </h2>
          <span className="text-sm text-gray-600">Last 5 transactions</span>
        </div>
        <TransactionTable 
          transactions={transactions.slice(0, 5)} 
          showCategory={true}
          isAdmin={false}
        />
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Financial Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3"
            >
              <span className="text-2xl">{insight.icon}</span>
              <div>
                <p className="text-sm text-gray-600">{insight.title}</p>
                <p className="text-lg font-semibold text-gray-800">
                  {insight.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
