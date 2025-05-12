import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
