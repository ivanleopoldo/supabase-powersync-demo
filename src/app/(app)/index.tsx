import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { Tables } from '@/lib/db/database.types';
import { cn, uuid } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/db/supabase';
import { AuthUser } from '@supabase/supabase-js';

export default function Home() {
  const [data, setData] = useState<Tables<'todos'>[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: user } = await supabase.auth.getUser();
      setUser(user.user);
    }

    getUser();
  });

  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase.from('todos').select('*');
      if (error) {
        console.log('error', error);
      }
      if (data) {
        setData(data);
      }
    }
    getTodos();
  });

  return (
    <SafeAreaView>
      <FlatList
        className="h-full"
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                const newData = [...data];
                newData[index].is_completed = newData[index].is_completed === 0 ? 1 : 0;
                setData(newData);
              }}>
              <View className="p-4">
                <Text
                  className={cn(
                    item.is_completed === 1 && 'line-through opacity-50',
                    'justify-center'
                  )}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View className="h-[1px] border-b border-b-neutral-200" />}
        ListFooterComponent={() => <View className="h-[1px] border-b border-b-neutral-200" />}
        ListEmptyComponent={() => (
          <View>
            <Text>Empty</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Pressable
            onPress={async () => {
              const { data, error } = await supabase.from('todos').insert({
                title: 'hello',
                owner_id: user?.id,
              });
              if (error) {
                console.error(error);
              }

              if (data) {
                console.log('data', data);
              }
            }}>
            <View>
              <Text>Add Todo</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
