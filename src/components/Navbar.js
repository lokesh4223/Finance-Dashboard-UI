import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Transaction', path: '/add-transaction' },
    { name: 'Transactions', path: '/transactions' },
  ];

  return (
    <header>
      {/* Title Bar */}
      <div className="win-titlebar" style={{ minHeight: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* App icon — a tiny chart symbol */}
          <span style={{ fontSize: '13px', lineHeight: 1 }}>&#x1F4CA;</span>
          <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3px' }}>
            Finance Dashboard — [Overview]
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <span className="win-titlebar-btn" title="Minimize">_</span>
          <span className="win-titlebar-btn" title="Maximize">&#9633;</span>
          <span className="win-titlebar-btn" title="Close" style={{ fontWeight: 'bold', marginLeft: '4px' }}>X</span>
        </div>
      </div>

      {/* Menu Bar */}
      <nav className="win-menubar" role="menubar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            role="menuitem"
            className={`win-menu-item${location.pathname === item.path ? ' active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '10px', color: '#444', paddingRight: '4px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </nav>

      {/* Toolbar */}
      <div className="win-toolbar" role="toolbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="btn"
            style={{ minWidth: '90px', fontSize: '11px', textDecoration: 'none' }}
          >
            {item.name}
          </Link>
        ))}
        <div
          style={{
            marginLeft: '8px',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid #fff',
            height: '18px',
            width: '2px',
          }}
        />
        <span style={{ fontSize: '10px', color: '#444', paddingLeft: '6px' }}>
          Personal Finance Manager v1.0
        </span>
      </div>
    </header>
  );
};

export default Navbar;
