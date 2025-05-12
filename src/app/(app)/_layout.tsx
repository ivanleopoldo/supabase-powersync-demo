import Header from '@/components/native/header';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          header: (props) => (
            <Header
              title={props.options.headerTitle?.toString() ?? props.options.title?.toString()}
            />
          ),
        }}>
        <Tabs.Screen name="index" options={{ headerTitle: 'Home' }} />
        <Tabs.Screen name="settings" options={{ headerTitle: 'Settings' }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}
