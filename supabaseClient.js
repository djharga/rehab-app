import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbumsmknzrtuybkaysqq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idW1zbWtuenJ0dXlia2F5c3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTU5NTcsImV4cCI6MjA2Njk3MTk1N30.PLDXkR032L11k_fcgIiUh9LIBp-6jSrotMceV91NTUw'

export const supabase = createClient(supabaseUrl, supabaseKey)