import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = ({ onAddTransaction }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (transaction) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await onAddTransaction(transaction);
      setSuccess(true);
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* Window */}
      <div className="win-window">
        {/* Title bar */}
        <div className="win-titlebar">
          <span>Add New Transaction</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span className="win-titlebar-btn">_</span>
            <span className="win-titlebar-btn">&#9633;</span>
            <span
              className="win-titlebar-btn"
              style={{ marginLeft: '4px', fontWeight: 'bold' }}
              onClick={() => navigate(-1)}
              title="Close"
            >
              X
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="win-toolbar">
          <button
            type="button"
            className="btn"
            onClick={() => navigate(-1)}
            style={{ minWidth: '60px', fontSize: '11px' }}
          >
            &#8592; Back
          </button>
        </div>

        {/* Form area */}
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--win-face)' }}>
          {/* Error dialog */}
          {error && (
            <div
              className="win-raised"
              style={{
                marginBottom: '8px',
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff0f0',
              }}
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>&#9888;</span>
              <span style={{ fontSize: '11px', color: 'var(--win-red)' }}>{error}</span>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div
              className="win-raised"
              style={{
                marginBottom: '8px',
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f0fff0',
              }}
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>&#10003;</span>
              <span style={{ fontSize: '11px', color: 'var(--win-green)' }}>
                Transaction added! Redirecting...
              </span>
            </div>
          )}

          <TransactionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Status bar */}
        <div className="win-statusbar">
          <span>{isSubmitting ? 'Saving transaction...' : 'Ready'}</span>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
