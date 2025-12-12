export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; // ISO String
}

export enum Category {
  FOOD = 'Food & Dining',
  TRANSPORT = 'Transport (Taxi/Metro/Fuel)',
  HOUSING = 'Housing & DEWA',
  GROCERIES = 'Groceries',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  SALARY = 'Salary',
  OTHER = 'Other',
}

export interface ExpenseSummary {
  category: string;
  amount: number;
}