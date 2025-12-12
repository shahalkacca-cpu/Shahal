import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category, TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (amount: number, type: TransactionType, category: string, description: string) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<string>(Category.FOOD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAddTransaction(parseFloat(amount), type, category, description);
    setAmount('');
    setDescription('');
    // Reset defaults
    setType(TransactionType.EXPENSE);
    setCategory(Category.FOOD);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Add Transaction</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Type</label>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                type === TransactionType.EXPENSE 
                  ? 'bg-white text-red-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                type === TransactionType.INCOME 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Income
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Amount (AED)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g. Carrefour, Taxi to Marina"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle size={18} />
        Add Transaction
      </button>
    </form>
  );
};