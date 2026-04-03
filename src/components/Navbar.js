import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const { role, setRole } = useFinance();
  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Transaction', path: '/add-transaction' },
    { name: 'Transactions', path: '/transactions' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Finance Dashboard</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-blue-700 bg-blue-100'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Role Switcher */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
              <FaUser className="text-gray-500" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
