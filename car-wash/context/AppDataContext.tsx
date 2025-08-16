import React, { createContext, useContext, useMemo, useState } from 'react';

export type ServiceType = 'Exterior Wash' | 'Interior Cleaning' | 'Full Wash' | 'Wax';
export type PaymentMethod = 'M-Pesa' | 'Card';

export interface IntakeEntry {
  id: string;
  numberPlate: string;
  carModel: string;
  serviceType: ServiceType;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: string;
}

interface AppDataContextValue {
  entries: IntakeEntry[];
  addEntry: (entry: Omit<IntakeEntry, 'id' | 'createdAt'>) => IntakeEntry;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<IntakeEntry[]>([]);

  const addEntry: AppDataContextValue['addEntry'] = (entry) => {
    const created: IntakeEntry = {
      ...entry,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [created, ...prev]);
    return created;
  };

  const value = useMemo(() => ({ entries, addEntry }), [entries]);
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}


