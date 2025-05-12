import { View, Text } from 'react-native';
import { useContext, createContext } from 'react';
import type { AuthSession, AuthUser } from '@supabase/supabase-js';

export const AuthContext = createContext({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export default function AuthProvider() {
  return (
    <View>
      <Text></Text>
    </View>
  );
}
