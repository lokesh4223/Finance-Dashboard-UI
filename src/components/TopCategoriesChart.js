import React from 'react';

// Classic Win2000 bar-chart colors (limited palette)
const WIN_COLORS = ['#000080', '#800000', '#008000', '#808000', '#008080'];

const TopCategoriesChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="win-window" style={{ height: '100%' }}>
      {/* Title bar */}
      <div className="win-titlebar" style={{ fontSize: '10px', padding: '2px 4px 2px 6px' }}>
        <span>Spending by Category</span>
        <span className="win-titlebar-btn" style={{ fontSize: '8px' }}>?</span>
      </div>

      {/* Content */}
      <div style={{ padding: '8px', backgroundColor: 'var(--win-face)' }}>
        {data.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#555', fontSize: '11px' }}>
            No expense data available.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.map((item, index) => {
              const pct = total > 0 ? (item.amount / total) * 100 : 0;
              const color = WIN_COLORS[index % WIN_COLORS.length];

              return (
                <div key={item.category}>
                  {/* Label row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      marginBottom: '2px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          backgroundColor: color,
                          border: '1px solid #000',
                          flexShrink: 0,
                        }}
                      />
                      {item.category}
                    </span>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '10px' }}>
                      ${item.amount.toFixed(2)} ({pct.toFixed(0)}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="win-progress-track">
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        backgroundColor: color,
                        // Win2000 style block fill
                        backgroundImage: `repeating-linear-gradient(
                          90deg,
                          ${color} 0px,
                          ${color} 10px,
                          rgba(255,255,255,0.18) 10px,
                          rgba(255,255,255,0.18) 12px
                        )`,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Separator */}
            <div
              style={{
                borderTop: '1px solid var(--win-border-shadow)',
                borderBottom: '1px solid var(--win-border-light)',
                margin: '4px 0',
              }}
            />

            {/* Total */}
            <div
              className="win-statusbar"
              style={{ padding: '1px 0', justifyContent: 'space-between' }}
            >
              <span>Total Expenses:</span>
              <span
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 'bold',
                  color: 'var(--win-red)',
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCategoriesChart;
