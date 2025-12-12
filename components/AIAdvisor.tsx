import React, { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { Transaction } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AIAdvisorProps {
  transactions: Transaction[];
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions }) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(transactions);
    setAdvice(result);
    setLoading(false);
    setHasFetched(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-indigo-400 opacity-20 blur-xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={20} />
            <h3 className="font-semibold text-lg">AI Financial Insights</h3>
          </div>
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCcw size={12} className={loading ? "animate-spin" : ""} />
            {loading ? 'Analyzing...' : (hasFetched ? 'Update Analysis' : 'Analyze Spending')}
          </button>
        </div>

        {hasFetched ? (
           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-sm leading-relaxed border border-white/10 animate-fade-in">
             <p className="whitespace-pre-line">{advice}</p>
           </div>
        ) : (
          <p className="text-indigo-100 text-sm opacity-80">
            Tap the button to let our AI analyze your transactions and provide personalized money-saving tips for life in the UAE.
          </p>
        )}
      </div>
    </div>
  );
};