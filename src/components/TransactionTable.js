import React from 'react';

const TransactionTable = ({ transactions, showCategory = true }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="win-sunken" style={{ overflow: 'auto' }}>
      <table className="win-listview">
        <thead>
          <tr>
            <th style={{ minWidth: '160px' }}>Description</th>
            <th style={{ minWidth: '100px' }}>Date</th>
            {showCategory && <th style={{ minWidth: '90px' }}>Category</th>}
            <th style={{ textAlign: 'right', minWidth: '90px' }}>Amount</th>
            <th style={{ minWidth: '60px' }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={showCategory ? 5 : 4}
                style={{ padding: '8px 6px', color: '#555', fontStyle: 'italic', textAlign: 'center' }}
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                </td>
                <td>{formatDate(transaction.date)}</td>
                {showCategory && (
                  <td>
                    <span className="win-badge">{transaction.category}</span>
                  </td>
                )}
                <td
                  style={{
                    textAlign: 'right',
                    fontFamily: 'Courier New, monospace',
                    color:
                      transaction.type === 'income' ? 'var(--win-green)' : 'var(--win-red)',
                    fontWeight: 'bold',
                  }}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td style={{ fontSize: '10px', color: '#555' }}>
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
