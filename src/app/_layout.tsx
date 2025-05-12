import { supabase } from '@/lib/db/supabase';
import '@/styles/global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(app)',
};

export default function RootLayout() {
  useEffect(() => {
    async function signIn() {
      await supabase.auth.signInWithPassword({
        email: 'ivanleoncla@gmail.com',
        password: '123456',
      });
    }
    signIn();
  });
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
