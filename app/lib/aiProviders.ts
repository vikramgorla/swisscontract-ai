// AI provider — Infomaniak OpenAI-compatible API (Swiss-sovereign)
//
// All models hosted on Infomaniak Swiss data centres 🇨🇭
// Endpoint: https://api.infomaniak.com/1/ai/openai/v1/chat/completions
// Auth: Bearer token from INFOMANIAK_AI_TOKEN env var

import { jsonrepair } from 'jsonrepair';

export interface ModelInfo {
  id: string;
  name: string;
  isSwiss?: boolean;
}

export const MODELS: ModelInfo[] = [
  { id: 'swiss-ai/Apertus-70B-Instruct-2509', name: 'Apertus 70B', isSwiss: true },
];

// Infomaniak v2 API requires a product_id in the URL path.
// Get it from: curl -H "Authorization: Bearer $TOKEN" https://api.infomaniak.com/1/ai
const PRODUCT_ID = process.env.INFOMANIAK_PRODUCT_ID ?? '';
const BASE_URL = `https://api.infomaniak.com/2/ai/${PRODUCT_ID}/openai/v1`;

/**
 * Extract JSON from a response that may be wrapped in markdown code fences.
 * Infomaniak models (especially Apertus) sometimes wrap output or emit malformed JSON.
 * Uses jsonrepair to handle all structural issues robustly.
 */
export function extractJSON(raw: string): string {
  // Strip <think>...</think> reasoning blocks (qwen3 and similar)
  let cleaned = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // Extract from markdown code fences if present
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  } else {
    // Extract the outermost JSON object
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) cleaned = objMatch[0];
  }

  // Remove control characters (except \n \r \t)
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');

  // Fix nested arrays wrapping objects — sometimes Apertus emits [[{...}]]
  cleaned = cleaned.replace(/\[\s*\[(\s*\{)/g, '[$1');
  cleaned = cleaned.replace(/(\})\s*\]\s*\]/g, '$1]');

  // Use jsonrepair to fix everything else: missing commas, trailing commas,
  // bare newlines in strings, truncated JSON, etc.
  try {
    cleaned = jsonrepair(cleaned);
  } catch {
    // jsonrepair failed — return as-is and let JSON.parse handle the error
  }

  return cleaned.trim();
}

/**
 * Call an AI model via the Infomaniak OpenAI-compatible API.
 *
 * @param prompt - Full prompt (system + user combined, or just user message)
 * @param pdfBuffer - Optional PDF buffer (not used for Infomaniak text API, reserved for future)
 * @param modelId - Model identifier (default: qwen3)
 * @returns The AI response text (JSON-extracted if wrapped)
 */
export async function callAI(
  prompt: string,
  pdfBuffer?: ArrayBuffer,
  modelId: string = 'swiss-ai/Apertus-70B-Instruct-2509',
): Promise<string> {
  const apiKey = process.env.INFOMANIAK_AI_TOKEN || process.env.INFOMANIAK_API_TOKEN;
  if (!apiKey) {
    throw new Error('INFOMANIAK_AI_TOKEN not set.');
  }
  if (!PRODUCT_ID) {
    throw new Error('INFOMANIAK_PRODUCT_ID not set.');
  }

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      max_completion_tokens: 8192,
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Infomaniak AI API error (${response.status}): ${body.slice(0, 500)}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content || '';

  return extractJSON(raw);
}
