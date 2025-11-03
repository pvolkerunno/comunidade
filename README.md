<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ruBPet1vWft74-Ysx8fHXHqHkESfRRoa

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Configure o Supabase em [.env.local](.env.local):
   - `VITE_SUPABASE_URL=https://fumwvqwcdoopvkvjqrio.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=<sua_chave_anon_do_projeto>`
   - (Opcional) `GEMINI_API_KEY=<sua_chave_gemini>`
3. Instale o Supabase SDK:
   `npm install @supabase/supabase-js`
4. Rode o app:
   `npm run dev`

### Uso do cliente Supabase

Importe o cliente em qualquer componente ou serviço:

```ts
import { supabase } from './supabaseClient';

// exemplo: verificar sessão atual
const {
  data: { session },
} = await supabase.auth.getSession();
```
