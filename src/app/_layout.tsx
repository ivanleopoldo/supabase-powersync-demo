import { system, useSystem } from '@/lib/db/system';
import { AuthProvider } from '@/lib/providers/AuthProvider';
import '@/styles/global.css';

import { router, Slot } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    supabaseConnector.client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.replace('/(todos)');
      } else if (event === 'SIGNED_OUT') {
        router.replace('/(auth)');
      }
    });
  });
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
