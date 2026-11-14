// fish-tts: speak a tutor line with Fish Audio, cached in the public `tts-cache` bucket.
//
// POST { text, reference_id }  (signed-in users only)
//   → { url, cached }   public MP3 URL in Storage
//
// The Fish Audio key lives only in this function's secrets (FISH_AUDIO_API_KEY).
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const MODEL = Deno.env.get('FISH_AUDIO_MODEL') ?? 's2.1-pro-free'
const BUCKET = 'tts-cache'
const MAX_CHARS = 900

// Only the five Nakano sisters' voices may be used.
const VOICES = new Set([
  'ab72b9e7a671480782159a7d7d1fc14d', // Ichika
  '11393e94e76847fdab0fa0c2f7b28ec1', // Nino
  'cbbac17ad4b44abd8f8d2f92bba92e4a', // Miku
  'ec5383778acc41f69a2b70679f860d8a', // Yotsuba
  '38e76f4c746f4545acea31e575b82099', // Itsuki
])

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Use POST' }, 405)

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  })

  // Signed-in users only (verified against Supabase Auth).
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
  const { data: who, error: authErr } = await admin.auth.getUser(token)
  if (authErr || !who?.user) return json({ error: 'Sign in to use tutor voices.' }, 401)

  const apiKey = Deno.env.get('FISH_AUDIO_API_KEY')
  if (!apiKey) return json({ error: 'Voice is not configured on the server.' }, 503)

  let body: { text?: string; reference_id?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }
  const text = String(body.text ?? '').replace(/\s+/g, ' ').trim()
  const referenceId = String(body.reference_id ?? '')
  if (!text || text.length > MAX_CHARS) return json({ error: `Text must be 1-${MAX_CHARS} characters.` }, 400)
  if (!VOICES.has(referenceId)) return json({ error: 'Unknown voice.' }, 400)

  const hash = await sha256(`${MODEL}:${referenceId}:${text.toLowerCase()}`)
  const path = `${hash}.mp3`
  const publicUrl = admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl

  // Cache hit?
  const { data: found } = await admin.storage.from(BUCKET).list('', { limit: 1, search: hash })
  if (found?.some((f) => f.name === path)) return json({ url: publicUrl, cached: true })

  // Cache miss: generate with Fish Audio.
  const res = await fetch('https://api.fish.audio/v1/tts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', model: MODEL },
    body: JSON.stringify({
      model: MODEL,
      text,
      reference_id: referenceId,
      format: 'mp3',
      mp3_bitrate: 128,
      normalize: true,
      latency: 'balanced',
    }),
  })
  if (!res.ok) return json({ error: `Fish Audio ${res.status}: ${(await res.text()).slice(0, 200)}` }, 502)
  const audio = new Uint8Array(await res.arrayBuffer())

  const up = await admin.storage.from(BUCKET).upload(path, audio, {
    contentType: 'audio/mpeg',
    cacheControl: '31536000',
    upsert: true,
  })
  // If caching fails, still return the audio itself.
  if (up.error) return new Response(audio, { headers: { ...cors, 'Content-Type': 'audio/mpeg' } })
  return json({ url: publicUrl, cached: false })
})
