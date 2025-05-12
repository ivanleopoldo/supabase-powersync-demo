import { View, Text, SafeAreaView } from 'react-native';

export default function Header({ title }: { title?: string }) {
  return (
    <SafeAreaView className="h-32 justify-center border-b border-b-neutral-200">
      <View className="px-8">
        <Text className="text-3xl font-bold">{title ?? 'Title'}</Text>
      </View>
    </SafeAreaView>
  );
}
