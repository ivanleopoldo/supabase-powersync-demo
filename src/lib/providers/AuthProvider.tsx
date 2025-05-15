import type { AuthUser, AuthSession } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { Text } from 'react-native';
import { useSystem } from '../db/system';
import { SupabaseConnector } from '../db/supabase';

export const AuthContext = createContext<{
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: ({ session, user }: { session: AuthSession | null; user: AuthUser | null }) => void;
  signOut: () => void;
  isSyncEnabled: boolean;
  setIsSyncEnabled: (isSyncEnabled: boolean) => void;
}>({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
  isSyncEnabled: true,
  setIsSyncEnabled: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { supabaseConnector } = useSystem();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);

  async function signIn({ session, user }: { session: AuthSession | null; user: AuthUser | null }) {
    console.log('signIn');
    setSession(session);
    setUser(user);
  }

  async function signOut() {
    console.log('signOut');
    const { error } = await supabaseConnector.client.auth.signOut();

    setSession(null);
    setUser(null);

    if (error) {
      console.error(error);
    }
  }

  async function getSession() {
    const { data } = await supabaseConnector.client.auth.getSession();

    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!session) getSession();
    // if (session && !user) getUser();
  }, [session, user]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        isSyncEnabled,
        setIsSyncEnabled,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
