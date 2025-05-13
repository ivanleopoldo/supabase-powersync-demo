import { PowerSyncProvider } from '@/lib/providers/PowerSyncProvider';
import { Stack } from 'expo-router';

export default function TodosLayout() {
  return (
    <PowerSyncProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </PowerSyncProvider>
  );
}
