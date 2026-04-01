import React from 'react';

const SummaryCard = ({ title, amount, change, icon, trend }) => {
  const isPositive = trend === 'up';
  const Icon = icon;

  return (
    <div className="win-window" style={{ minWidth: 0 }}>
      {/* Title bar */}
      <div className="win-titlebar" style={{ fontSize: '10px', padding: '2px 4px 2px 6px' }}>
        <span>{title}</span>
        <span className="win-titlebar-btn" style={{ fontSize: '8px' }}>?</span>
      </div>

      {/* Content area */}
      <div style={{ padding: '8px 10px 8px 10px', backgroundColor: 'var(--win-face)' }}>
        {/* Icon + amount row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          {/* Sunken icon box */}
          <div
            className="win-sunken"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={18} color={isPositive ? 'var(--win-green)' : 'var(--win-red)'} />
          </div>

          <div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Courier New, monospace',
                color: isPositive ? 'var(--win-green)' : 'var(--win-red)',
                letterSpacing: '-0.5px',
              }}
            >
              ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            borderTop: '1px solid var(--win-border-shadow)',
            borderBottom: '1px solid var(--win-border-light)',
            margin: '4px 0',
          }}
        />

        {/* Status bar style footer */}
        <div className="win-statusbar" style={{ padding: '1px 0', gap: '4px' }}>
          <span
            style={{
              color: isPositive ? 'var(--win-green)' : 'var(--win-red)',
              fontWeight: 'bold',
              fontSize: '10px',
            }}
          >
            {isPositive ? '▲' : '▼'} {change}%
          </span>
          <span style={{ fontSize: '10px', color: 'var(--win-text-muted)' }}>vs. last month</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
