import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import Config from "react-native-config";
import 'react-native-url-polyfill/auto';

// Fallback to process.env for web environments where react-native-config might not work
const supabaseUrl = Config.SUPABASE_URL || process.env.SUPABASE_URL || 'https://tzgfljfpxpyosxtcscgw.supabase.co';
const supabaseAnonKey = Config.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Z2ZsamZweHB5b3N4dGNzY2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MzY4MzksImV4cCI6MjA2OTIxMjgzOX0.gYjLcd_NauXNMUHIMkIRLccip0Qh0RdPNxJZ_XjdGe4';

// Create a web-compatible storage implementation
const createWebStorage = () => {
  return {
    getItem: (key: string) => {
      if (typeof localStorage !== 'undefined') {
        return Promise.resolve(localStorage.getItem(key));
      }
      return Promise.resolve(null);
    },
    setItem: (key: string, value: string) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
      return Promise.resolve();
    },
    removeItem: (key: string) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
      return Promise.resolve();
    },
  };
};

// Use web storage for web platform, AsyncStorage for native
const storage = Platform.OS === 'web' ? createWebStorage() : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
    lock: processLock,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
} else {
  // For web, use page visibility API
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    })
  }
}
