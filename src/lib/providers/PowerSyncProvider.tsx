import '@azure/core-asynciterator-polyfill';
import { createBaseLogger, PowerSyncContext, PowerSyncDatabase } from '@powersync/react-native';
import { ReactNode, useEffect, useMemo } from 'react';
import { OPSqliteOpenFactory } from '@powersync/op-sqlite'; // Add this import

import { useAuth } from './AuthProvider';
import { Connector } from '@/lib/db/connector';
import { schema } from '@/lib/db/schema';
import { useSystem } from '../db/system';

createBaseLogger().useDefaults();

const connector = new Connector();

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();

  const system = useSystem();

  useEffect(() => {
    system.init();
  }, []);

  const db = useMemo(() => {
    return system.powersync;
  }, []);

  useEffect(() => {
    if (isSyncEnabled) {
     db. 
        .connect(connector)
        .then(() => console.log('connected'))
        .catch(console.error);
    } else {
      system.powersync
        .disconnect()
        .then(() => console.log('not connected'))
        .catch(console.error);
    }
  }, [isSyncEnabled, system.powersync]);

  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};
