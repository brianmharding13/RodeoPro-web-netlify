import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PowerSyncContext } from '@powersync/react';
import { db } from '../lib/db';

export default function App() {
  return (
    <ThemeProvider>
      <PowerSyncContext.Provider value={db}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PowerSyncContext.Provider>
    </ThemeProvider>
  );
}
