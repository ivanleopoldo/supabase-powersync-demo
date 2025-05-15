import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import { View, Text, SafeAreaView, Switch, Pressable } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { supabase } from '@/lib/db/supabase';
import { usePowerSync } from '@powersync/react';

export default function Settings() {
  const { isSyncEnabled, setIsSyncEnabled, signOut } = useAuth();
  const powersync = usePowerSync();

  const handleSignOut = async () => {
    router.replace('/(auth)');
    await powersync.disconnectAndClear().catch((error) => console.error(error));
    await supabase.auth.signOut();
    signOut();
  };

  return (
    <>
      <Tabs.Screen
        options={{
          title: 'Settings',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="cog" size={24} color={color} />;
          },
        }}
      />
      <SafeAreaView className="relative h-full w-full">
        <View className="h-full w-full gap-4 p-8">
          <View className="flex flex-row items-center justify-between rounded-lg bg-zinc-200 px-4 py-2">
            <Text className="text-xl font-medium">Enable Sync</Text>
            <Switch
              thumbColor={isSyncEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#E4E4E7"
              onValueChange={(v) => setIsSyncEnabled(v)}
              value={isSyncEnabled}
            />
          </View>
          <Pressable
            onPress={() => handleSignOut()}
            className="flex flex-row items-center justify-center rounded-lg bg-zinc-200 px-4 py-2 active:bg-zinc-300">
            <Text className="text-lg text-red-700">Sign Out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
