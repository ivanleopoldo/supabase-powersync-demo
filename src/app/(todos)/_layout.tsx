import { useSystem } from '@/lib/db/system';
import { useAuth } from '@/lib/providers/AuthProvider';
import { PowerSyncProvider } from '@/lib/providers/PowerSyncProvider';
import { PowerSyncContext } from '@powersync/react';
import { Redirect, router, Tabs } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

export default function TodosLayout() {
  const { session, isSyncEnabled } = useAuth();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  const system = useSystem();

  useEffect(() => {
    system.init();
  }, []);

  const db = useMemo(() => {
    return system.powersync;
  }, []);

  useEffect(() => {
    if (isSyncEnabled) {
      db.connect(system.supabaseConnector)
        .then(() => console.log('connected'))
        .catch(console.error);
    } else {
      db.disconnect()
        .then(() => console.log('not connected'))
        .catch(console.error);
    }
  }, [isSyncEnabled, db]);

  return (
    <PowerSyncContext.Provider value={db}>
      <Tabs>
        <Tabs.Screen name="index" />
      </Tabs>
    </PowerSyncContext.Provider>
  );
}
