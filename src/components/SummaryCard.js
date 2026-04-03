import React from 'react';

const SummaryCard = ({ title, amount, icon: Icon, color = 'blue', trend = 'stable' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            ₹{amount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className={`p-4 rounded-full ${colorClasses[color]}`}>
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
