import React from 'react';
import { Transaction, TransactionType } from '../types';
import { ArrowDownRight, ArrowUpRight, Coffee, Home, ShoppingBag, Car, Zap, DollarSign, Package } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  if (category.includes('Food')) return <Coffee size={18} />;
  if (category.includes('Housing')) return <Home size={18} />;
  if (category.includes('Shopping')) return <ShoppingBag size={18} />;
  if (category.includes('Transport')) return <Car size={18} />;
  if (category.includes('Salary')) return <DollarSign size={18} />;
  if (category.includes('Groceries')) return <Package size={18} />;
  return <Zap size={18} />;
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center">
        <div className="bg-slate-50 p-4 rounded-full mb-3">
          <ShoppingBag className="text-slate-300" size={32} />
        </div>
        <h3 className="text-slate-600 font-medium">No transactions yet</h3>
        <p className="text-slate-400 text-sm mt-1">Start tracking your AED flow today!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-50 bg-slate-50/50">
        <h3 className="font-semibold text-slate-700">Recent Activity</h3>
      </div>
      <div className="overflow-y-auto max-h-[400px] p-2 custom-scrollbar">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="group flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors mb-1">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === TransactionType.EXPENSE ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
              }`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-slate-800 text-sm">{transaction.description}</p>
                <p className="text-xs text-slate-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold text-sm ${
                transaction.type === TransactionType.EXPENSE ? 'text-slate-900' : 'text-emerald-600'
              }`}>
                {transaction.type === TransactionType.EXPENSE ? '-' : '+'}
                AED {transaction.amount.toLocaleString()}
              </span>
              <button 
                onClick={() => onDelete(transaction.id)}
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Delete transaction"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};