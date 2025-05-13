import { supabase } from '@/lib/db/supabase';
import { AuthProvider } from '@/lib/providers/AuthProvider';
import '@/styles/global.css';

import { router, Slot } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/(todos)');
      } else if (event === 'SIGNED_OUT') {
        router.push('/(auth)');
      }
    });
  });
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
