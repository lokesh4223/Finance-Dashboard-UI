import React, { useState, useEffect } from 'react';

const TransactionHistory = ({ transactions = [] }) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setFilteredTransactions(transactions);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    let result = [...transactions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.title.toLowerCase().includes(term) ||
          tx.category.toLowerCase().includes(term) ||
          tx.amount.toString().includes(term)
      );
    }

    if (filters.type !== 'all') result = result.filter((tx) => tx.type === filters.type);
    if (filters.category !== 'all') result = result.filter((tx) => tx.category === filters.category);
    if (filters.startDate) result = result.filter((tx) => tx.date >= filters.startDate);
    if (filters.endDate) result = result.filter((tx) => tx.date <= filters.endDate);

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTransactions(result);
  }, [transactions, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Error';
    }
  };

  const categories = [...new Set(transactions.map((tx) => tx.category))].filter(Boolean);

  const sortArrow = (key) => {
    if (sortConfig.key !== key) return ' ';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const labelStyle = { display: 'block', fontSize: '11px', marginBottom: '2px' };
  const colStyle = { display: 'flex', flexDirection: 'column' };

  if (isLoading) {
    return (
      <div className="win-loading">
        <div className="win-hourglass">&#x231B;</div>
        <span>Loading transactions...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

      {/* Window */}
      <div className="win-window">
        {/* Title bar */}
        <div className="win-titlebar">
          <span>Transaction History</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span className="win-titlebar-btn">_</span>
            <span className="win-titlebar-btn">&#9633;</span>
            <span className="win-titlebar-btn" style={{ marginLeft: '4px', fontWeight: 'bold' }}>X</span>
          </div>
        </div>

        {/* Search toolbar */}
        <div className="win-toolbar" style={{ gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px' }}>Search:</span>
          <input
            type="text"
            className="input-field"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px' }}
          />
          <div
            style={{
              borderLeft: '2px solid #808080',
              borderRight: '2px solid #fff',
              height: '18px',
              width: '2px',
              margin: '0 4px',
            }}
          />
          <span style={{ fontSize: '10px', color: '#555' }}>
            {filteredTransactions.length} of {transactions.length} record(s)
          </span>
        </div>

        {/* Filters groupbox */}
        <div style={{ padding: '8px', backgroundColor: 'var(--win-face)' }}>
          <div className="win-groupbox">
            <span className="win-groupbox-label">Filters</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '6px',
              }}
            >
              <div style={colStyle}>
                <label style={labelStyle}>Type:</label>
                <select name="type" value={filters.type} onChange={handleFilterChange} className="input-field">
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>Category:</label>
                <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field">
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>From:</label>
                <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="input-field" />
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>To:</label>
                <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="input-field" min={filters.startDate} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: '0 8px 8px 8px', backgroundColor: 'var(--win-face)' }}>
          <div className="win-sunken" style={{ overflow: 'auto' }}>
            <table className="win-listview">
              <thead>
                <tr>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Description{sortArrow('title')}
                  </th>
                  <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                    Date{sortArrow('date')}
                  </th>
                  <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                    Category{sortArrow('category')}
                  </th>
                  <th
                    onClick={() => handleSort('amount')}
                    style={{ cursor: 'pointer', textAlign: 'right' }}
                  >
                    Amount{sortArrow('amount')}
                  </th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '10px',
                              height: '10px',
                              backgroundColor:
                                transaction.type === 'income' ? 'var(--win-green)' : 'var(--win-red)',
                              border: '1px solid #000',
                              flexShrink: 0,
                            }}
                          />
                          {transaction.title}
                        </span>
                      </td>
                      <td>{formatDate(transaction.date)}</td>
                      <td>
                        <span className="win-badge">{transaction.category}</span>
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                          fontFamily: 'Courier New, monospace',
                          fontWeight: 'bold',
                          color:
                            transaction.type === 'income' ? 'var(--win-green)' : 'var(--win-red)',
                        }}
                      >
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount.toFixed(2)}
                      </td>
                      <td style={{ fontSize: '10px', color: '#555' }}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ padding: '8px', textAlign: 'center', color: '#555', fontStyle: 'italic' }}
                    >
                      No transactions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status bar */}
        <div className="win-statusbar" style={{ justifyContent: 'space-between' }}>
          <span>{filteredTransactions.length} item(s) displayed</span>
          <span style={{ color: '#555' }}>
            Sort: {sortConfig.key} ({sortConfig.direction})
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
