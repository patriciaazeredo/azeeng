import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://vjeosenpfudfccdnwcnb.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZW9zZW5wZnVkZmNjZG53Y25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTY4MjMsImV4cCI6MjA2MzIzMjgyM30.RTDUAQCYxC6BGmPeDnCiI7_S24GOhQ5m4L2An1gp74s';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);