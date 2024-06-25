'use client'
import Loading from '@/components/Loading';
import { createContext, SetStateAction, useContext, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import {Alert} from '@mui/material';
import type { AlertColor } from '@mui/material';

interface IContextValue {
  loading:  boolean,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  snacker: ISnacker,
  setSnacker: React.Dispatch<SetStateAction<ISnacker>>
}

interface ISnacker {
  message: string
  open: boolean
  color: AlertColor
}

const AppContext = createContext<IContextValue | undefined>(undefined);

export default function Provider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [snacker, setSnacker] = useState<ISnacker>({
    message: '',
    open: false,
    color: 'info'
  })

  const handleClose = () => {
    setSnacker({ ...snacker, open: false });
  };
  return (
    <AppContext.Provider value={{loading, setLoading, snacker, setSnacker}}>
      {loading ? <Loading /> : children}
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical:"bottom" , horizontal:'center'}}
          open={snacker.open}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert
            onClose={handleClose}
            severity={snacker.color}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snacker.message}
          </Alert>
        </Snackbar>
      </Box>
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