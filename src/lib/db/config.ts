if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase Credentials');
}

export type Config = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  powerSyncUrl: string;
};

export const config: Config = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  powerSyncUrl: '',
};
