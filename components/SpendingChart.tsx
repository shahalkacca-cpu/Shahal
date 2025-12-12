import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface SpendingChartProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6', '#ef4444', '#64748b'];

export const SpendingChart: React.FC<SpendingChartProps> = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE);

  const data = React.useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(t => {
      if (categoryTotals[t.category]) {
        categoryTotals[t.category] += t.amount;
      } else {
        categoryTotals[t.category] = t.amount;
      }
    });

    return Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full flex items-center justify-center">
        <p className="text-slate-400 text-sm">Add expenses to see analytics</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm h-full flex flex-col">
      <h3 className="font-semibold text-slate-700 mb-4 px-2">Spending by Category</h3>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `AED ${value.toLocaleString()}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ fontSize: '12px' }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};