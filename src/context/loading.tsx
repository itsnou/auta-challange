import { createContext, SetStateAction, useState } from 'react';

interface IContextValue {
  loading:  boolean,
  setLoading: React.Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<IContextValue | undefined>(undefined);

export default function Provider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{loading, setLoading}}>
      {children}
    </AppContext.Provider>
  )
}