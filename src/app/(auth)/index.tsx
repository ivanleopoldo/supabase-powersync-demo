import { useAuth } from '@/lib/providers/AuthProvider';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import { useSystem } from '@/lib/db/system';

export default function Auth() {
  const { supabaseConnector } = useSystem();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, user } = useAuth();

  if (user) {
    return <Redirect href="/(todos)" />;
  }

  const handleSignUp = async () => {
    const { data, error } = await supabaseConnector.client.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      signIn(data);
    }
  };

  const handleSignIn = async () => {
    const { data, error } = await supabaseConnector.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      signIn(data);
    }
  };

  return (
    <SafeAreaView className="relative my-8 flex h-full w-full">
      <View className="flex h-full w-full justify-between gap-4 p-8">
        <View className="mt-36 gap-10">
          <View className="flex w-full justify-center">
            <Text className="text-4xl font-bold">{isSignUp ? 'Register' : 'Login'}</Text>
            <Text className="text-lg font-light text-gray-500">
              {isSignUp
                ? 'Create an account to use the app'
                : 'Sign in to your account to access the app'}
            </Text>
          </View>
          <View className="w-full gap-4">
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="john@doe.com"
              className="rounded-lg bg-zinc-200 px-6 py-4"
            />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
              placeholder="Password"
              className="rounded-lg bg-zinc-200 px-6 py-4"
            />
            <Pressable
              onPress={() => {
                try {
                  if (isSignUp) {
                    handleSignUp();
                  } else {
                    handleSignIn();
                  }
                } catch (error) {
                  Alert.alert(
                    'Error',
                    `An error occurred while ${isSignUp ? 'signing up' : 'signing in'}`
                  );
                } finally {
                  setEmail('');
                  setPassword('');
                }
              }}
              className="w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2 active:bg-blue-600">
              <Text className="font-bold text-white">{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex w-full flex-row items-center justify-center gap-2">
          <Text>{isSignUp ? 'Already have an account?' : "Don't have an account yet?"}</Text>
          <Text
            onPress={() => setIsSignUp((prev) => !prev)}
            className="text-blue-700 active:text-blue-600">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
