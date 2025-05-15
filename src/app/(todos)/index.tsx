import { Tables } from '@/lib/db/database.types';
import { useAuth } from '@/lib/providers/AuthProvider';
import { useQuery } from '@powersync/react';
import { Tabs } from 'expo-router';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useSystem } from '@/lib/db/system';
import { uuid } from '@/lib/db/uuid';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

//@ts-ignore
import SwipeableFlatList from 'react-native-swipeable-list';

export default function Home() {
  const [todo, setTodo] = useState('');
  const { user } = useAuth();
  const system = useSystem();

  const { data: todos, isLoading } = useQuery('SELECT * FROM todos');

  const handleToggleCompleted = async (item: Tables<'todos'>) => {
    await system.powersync.execute('UPDATE todos SET is_completed = ? WHERE id = ?', [
      item.is_completed === 1 ? 0 : 1,
      item.id,
    ]);
  };

  const handleInputSubmit = async (title: string) => {
    Keyboard.dismiss();
    await system.powersync.execute('INSERT INTO todos (id, owner_id, title) VALUES (?, ?, ?)', [
      uuid(),
      user?.id,
      title,
    ]);

    setTodo('');
  };

  const handleDelete = async (item: Tables<'todos'>) => {
    await system.powersync.execute(`DELETE FROM todos WHERE id = ?`, [item.id]);
  };

  return (
    <>
      <Tabs.Screen
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
      />
      <SafeAreaView className="flex-1 ">
        <View className="relative h-full w-full">
          {isLoading ? (
            <View className="h-full w-full items-center justify-center">
              <ActivityIndicator />
            </View>
          ) : (
            <SwipeableFlatList
              keyExtractor={(item: Tables<'todos'>) => item.id}
              className="h-full w-full p-4"
              data={todos}
              renderItem={({ item }: { item: Tables<'todos'> }) => {
                return (
                  <Pressable onLongPress={() => {}} onPress={() => handleToggleCompleted(item)}>
                    <View className="flex-row items-center gap-3 rounded-lg bg-zinc-200 px-6 py-3">
                      {item.is_completed === 1 ? (
                        <FontAwesome name="check-square" size={20} />
                      ) : (
                        <FontAwesome name="square-o" size={20} />
                      )}
                      <Text className="font-medium">{item.title}</Text>
                    </View>
                  </Pressable>
                );
              }}
              maxSwipeDistance={45}
              renderQuickActions={({ index, item }: { index: number; item: Tables<'todos'> }) => (
                <View className="flex-1 items-end">
                  <Pressable
                    onPress={() => handleDelete(item)}
                    className="h-full items-center justify-center rounded-lg bg-red-400 px-4">
                    <FontAwesome name="trash" size={16} color="white" />
                  </Pressable>
                </View>
              )}
              ItemSeparatorComponent={() => <View className="h-2" />}
              ListEmptyComponent={() => (
                <View className="h-full w-full items-center justify-center ">
                  <Text className="text-lg text-zinc-400">EMPTY :(</Text>
                  <Text className="text-lg text-zinc-400">Add Todos</Text>
                </View>
              )}
            />
          )}
          <KeyboardAvoidingView className="flex-row items-center justify-center border-t border-t-zinc-200 bg-white p-3">
            <TextInput
              autoCapitalize="none"
              value={todo}
              onChangeText={(t) => setTodo(t)}
              placeholder="New Todo"
              className="flex-1 rounded-bl-lg rounded-tl-lg bg-zinc-200 px-5 py-3"
            />
            <Pressable
              onPress={() => handleInputSubmit(todo)}
              className="items-center justify-center rounded-br-lg rounded-tr-lg bg-blue-500 active:bg-blue-600 ">
              <Text className="px-5 py-1.5 text-2xl font-bold text-white">+</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
}
