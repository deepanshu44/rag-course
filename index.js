import { Mistral } from '@mistralai/mistralai'
import { createClient } from '@supabase/supabase-js'
// import dataUpload from 'data.js'
// import prompting from 'prompting.js'

import dotenv from 'dotenv'
dotenv.config()
const mistralClient = new Mistral({apiKey:process.env.MISTRAL_API_KEY});
const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY);

// dataUpload(mistralClient,supabase)

// prompting(mistralClient,supabase)
