import { Tables } from '@/lib/db/database.types';
import { useAuth } from '@/lib/providers/AuthProvider';
import { usePowerSync, useQuery } from '@powersync/react';
import { Stack } from 'expo-router';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

export default function Home() {
  const { user } = useAuth();
  const powersync = usePowerSync();

  const { data: todos } = useQuery('SELECT * FROM todos');

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Home' }} />
      <SafeAreaView className="flex-1 ">
        <View className="relative h-full w-full p-4">
          <FlatList
            className="h-full w-full"
            data={todos}
            renderItem={({ item }: { item: Tables<'todos'> }) => {
              return (
                <View className="rounded-lg bg-zinc-200 p-4">
                  <Text className="font-medium">{item.title}</Text>
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <View className="h-full w-full items-center justify-center ">
                <Text className="text-lg text-zinc-400">EMPTY :(</Text>
                <Text className="text-lg text-zinc-400">Add Todos</Text>
              </View>
            )}
          />
        </View>
        <View>
          <Text></Text>
        </View>
      </SafeAreaView>
    </>
  );
}
