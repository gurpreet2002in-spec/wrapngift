import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iekgzanziewfjebvwwgv.supabase.co';
const supabaseAnonKey = 'sb_publishable_NB69qJP0I8Gl7LSVhFnLOw_rROCWZF1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
