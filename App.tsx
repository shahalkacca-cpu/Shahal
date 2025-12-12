import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wallet, TrendingUp, TrendingDown, Menu, X, Landmark } from 'lucide-react';
import { Transaction, TransactionType } from './types';
import { StatsCard } from './components/StatsCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { SpendingChart } from './components/SpendingChart';
import { AIAdvisor } from './components/AIAdvisor';

const STORAGE_KEY = 'dirhamflow_transactions';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (amount: number, type: TransactionType, category: string, description: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount,
      type,
      category,
      description,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // Today's spending
  const today = new Date().toISOString().split('T')[0];
  const spentToday = transactions
    .filter(t => t.type === TransactionType.EXPENSE && t.date.startsWith(today))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-30 transform transition-transform duration-200 lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-2 text-indigo-700 mb-8">
            <Landmark size={28} />
            <h1 className="text-2xl font-bold tracking-tight">DirhamFlow</h1>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium">
              <LayoutDashboard size={20} />
              Dashboard
            </a>
            <div className="px-4 py-3 text-slate-400 flex items-center gap-3 cursor-not-allowed opacity-60">
              <Wallet size={20} />
              Budget (Coming Soon)
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-100">
           <div className="text-xs text-slate-400 text-center">
             Tracking AED for a better life.
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="font-semibold text-slate-700">Daily Overview</div>
          <div className="text-sm text-slate-500 hidden sm:block">
            {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                title="Total Balance" 
                amount={currentBalance} 
                icon={<Wallet className="text-indigo-600" />} 
                colorClass="text-slate-900"
              />
              <StatsCard 
                title="Income" 
                amount={totalIncome} 
                icon={<TrendingUp className="text-emerald-500" />} 
                colorClass="text-emerald-600"
              />
              <StatsCard 
                title="Expenses" 
                amount={totalExpense} 
                icon={<TrendingDown className="text-red-500" />} 
                colorClass="text-red-600"
              />
              <StatsCard 
                title="Spent Today" 
                amount={spentToday} 
                icon={<LayoutDashboard className="text-orange-500" />} 
                colorClass="text-orange-600"
              />
            </div>

            {/* AI Advisor Section */}
            <AIAdvisor transactions={transactions} />

            {/* Main Interactive Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Form & Recent List */}
              <div className="lg:col-span-2 space-y-6">
                <TransactionForm onAddTransaction={addTransaction} />
                <TransactionList transactions={transactions} onDelete={deleteTransaction} />
              </div>

              {/* Right Column: Analytics */}
              <div className="lg:col-span-1 h-[400px] lg:h-auto">
                <SpendingChart transactions={transactions} />
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;