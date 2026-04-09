import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Login from './Login';

export default function Index() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <Login onAuthenticated={() => setAuthenticated(true)} />;
  }

  return <DashboardLayout />;
}
