if (
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  !process.env.EXPO_PUBLIC_POWERSYNC_URL
) {
  throw new Error('Missing Credentials');
}

export type Config = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  powerSyncUrl: string;
};

export const config: Config = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  powerSyncUrl: process.env.EXPO_PUBLIC_POWERSYNC_URL,
};
