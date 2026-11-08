import { tsunamiEvents } from './tsunamiEvents.js'

// Supabase client — akan aktif setelah kredensial dikonfigurasi
// Saat ini data diambil dari file lokal (tsunamiEvents.js)

let supabase = null

export function getSupabaseClient() {
  if (supabase) return supabase

  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key || url.includes('your-project')) {
    return null
  }

  // Abstraksi client yang siap dikoneksikan saat package @supabase/supabase-js dipasang
  return null
}

export async function fetchTsunamiEvents() {
  const client = getSupabaseClient()
  if (!client) {
    // Fallback otomatis ke dataset lokal tervalidasi
    return tsunamiEvents
  }

  // Future implementasi saat kredensial Supabase terkonfigurasi:
  // const { data, error } = await client.from('tsunami_events').select('*').order('year', { ascending: false });
  // if (error) throw error;
  // return data;
  return tsunamiEvents
}

