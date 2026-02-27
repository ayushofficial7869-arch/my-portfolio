import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://diycrzzyfvdzyxbifrdd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeWNyenp5ZnZkenl4YmlmcmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODcyODQsImV4cCI6MjA4Nzc2MzI4NH0.wF7E_EjjW7GVxwKlaTQd3kb3rxVZWoiIiZzmfGsuMrQ"

export const supabase = createClient(supabaseUrl, supabaseKey)