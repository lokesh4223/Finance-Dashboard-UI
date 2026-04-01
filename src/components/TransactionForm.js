import React, { useState } from 'react';

const TransactionForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    amount: initialData.amount || '',
    category: initialData.category || 'Food',
    type: initialData.type || 'expense',
    date: initialData.date || new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Food', 'Shopping', 'Transport', 'Housing', 'Entertainment',
    'Utilities', 'Healthcare', 'Education', 'Salary', 'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    };
    onSubmit(transaction);
    if (!initialData.id) {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    marginBottom: '2px',
    fontWeight: 'normal',
    color: 'var(--win-text)',
  };

  const rowStyle = {
    marginBottom: '8px',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={rowStyle}>
        <label htmlFor="title" style={labelStyle}>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>

      <div style={rowStyle}>
        <label htmlFor="amount" style={labelStyle}>Amount ($):</label>
        <input
          type="number"
          step="0.01"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="input-field"
          placeholder="0.00"
          required
          style={{ fontFamily: 'Courier New, monospace' }}
        />
      </div>

      {/* Category + Type side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', ...rowStyle }}>
        <div>
          <label htmlFor="category" style={labelStyle}>Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" style={labelStyle}>Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div style={rowStyle}>
        <label htmlFor="date" style={labelStyle}>Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>

      {/* Separator */}
      <div
        style={{
          borderTop: '1px solid var(--win-border-shadow)',
          borderBottom: '1px solid var(--win-border-light)',
          margin: '10px 0',
        }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() =>
            setFormData({
              title: '',
              amount: '',
              category: 'Food',
              type: 'expense',
              date: new Date().toISOString().split('T')[0],
            })
          }
        >
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData.id ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
