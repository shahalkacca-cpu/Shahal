import React from 'react';

interface StatsCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  trend?: string;
  colorClass?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, amount, icon, colorClass = "text-slate-900" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>
          AED {amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-full text-slate-600">
        {icon}
      </div>
    </div>
  );
};