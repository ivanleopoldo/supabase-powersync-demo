import '@azure/core-asynciterator-polyfill';

import { createBaseLogger, LogLevel, PowerSyncDatabase } from '@powersync/react-native';
import React from 'react';

import { SupabaseConnector } from './supabase';
import { schema } from './schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OPSqliteOpenFactory } from '@powersync/op-sqlite'; // Add this import

const logger = createBaseLogger();
logger.useDefaults();
logger.setLevel(LogLevel.INFO);

export class System {
  storage: typeof AsyncStorage;
  supabaseConnector: SupabaseConnector;
  powersync: PowerSyncDatabase;

  constructor() {
    const opSqlite = new OPSqliteOpenFactory({
      dbFilename: 'powersync.db',
    });

    this.supabaseConnector = new SupabaseConnector(this);
    this.storage = AsyncStorage;
    this.powersync = new PowerSyncDatabase({
      schema,
      database: opSqlite,
    });
  }

  async signOut() {
    try {
      await this.powersync.disconnectAndClear();
    } catch (error) {
      console.error('Error disconnecting PowerSync:', error);
    }

    try {
      await this.supabaseConnector.client.auth.signOut();
    } catch (error) {
      console.error('Error signing out from Supabase:', error);
    }
  }

  async init() {
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);
  }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
