'use client'
import Loading from '@/components/Loading';
import { createContext, SetStateAction, useContext, useState } from 'react';

interface IContextValue {
  loading:  boolean,
  setLoading: React.Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<IContextValue | undefined>(undefined);

export default function Provider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{loading, setLoading}}>
      {loading ? <Loading /> : children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if(!context) {
    throw new Error('use context is not found')
  }

  return context
}