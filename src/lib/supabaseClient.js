import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gbweuguxpqjpvnnofuqd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdid2V1Z3V4cHFqcHZubm9mdXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1OTUyNzgsImV4cCI6MjAwMzE3MTI3OH0.0F4jDs3TcPlhSTtXrQuJvJauKoLHSHXmnas-TQtu9Fk';

const customStorageAdapter = {
    getItem: async (key) => {
        const data = await chrome.storage.local.get(key);
        return data[key]
    },
    setItem: (key, value) => {
        chrome.storage.local.set({ [key]: value })
    },
    removeItem: (key) => {
        chrome.storage.local.remove(key);
    },
}

const options = {
    auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: customStorageAdapter,
    }
}

const supabase = createClient(
    supabaseUrl, 
    supabaseKey,
    options
    );

export { supabase }