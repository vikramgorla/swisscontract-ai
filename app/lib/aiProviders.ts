// AI provider — Infomaniak OpenAI-compatible API (Swiss-sovereign)
//
// All models hosted on Infomaniak Swiss data centres 🇨🇭
// Endpoint: https://api.infomaniak.com/1/ai/openai/v1/chat/completions
// Auth: Bearer token from INFOMANIAK_AI_TOKEN env var

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
const PRODUCT_ID = process.env.INFOMANIAK_PRODUCT_ID || '107324';
const BASE_URL = `https://api.infomaniak.com/2/ai/${PRODUCT_ID}/openai/v1`;

/**
 * Extract JSON from a response that may be wrapped in markdown code fences.
 * Infomaniak models (especially Apertus and Mistral) sometimes wrap output.
 */
export function extractJSON(raw: string): string {
  // Strip <think>...</think> reasoning blocks (qwen3 and similar)
  let cleaned = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // Try to extract from markdown code fences first
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  } else {
    // Extract the outermost JSON object if there's surrounding text
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) cleaned = objMatch[0];
  }

  // Remove control characters (except \n \r \t) that break JSON.parse
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');

  // Fix literal newlines inside JSON string values (Apertus bug: emits \n\n inside strings)
  // Walk the string and replace bare \n/\r inside quoted values with \n escape sequence
  cleaned = fixNewlinesInStrings(cleaned);

  // Fix trailing commas before ] or } (all models do this occasionally)
  cleaned = cleaned.replace(/,(\s*[\]\}])/g, '$1');

  // Fix nested arrays wrapping objects — sometimes emits [[{...}]]
  cleaned = cleaned.replace(/\[\s*\[(\s*\{)/g, '[$1');
  cleaned = cleaned.replace(/(\})\s*\]\s*\]/g, '$1]');

  // Fix truncated JSON — if response was cut off mid-stream, close open structures
  cleaned = repairTruncatedJSON(cleaned);

  return cleaned.trim();
}

/**
 * Replace literal newlines/carriage-returns inside JSON string values with \n escape.
 * Apertus 70B emits multi-paragraph strings with bare \n which breaks JSON.parse.
 */
function fixNewlinesInStrings(str: string): string {
  let result = '';
  let inString = false;
  let escape = false;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (escape) {
      escape = false;
      result += c;
      continue;
    }
    if (c === '\\' && inString) {
      escape = true;
      result += c;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      result += c;
      continue;
    }
    if (inString && (c === '\n' || c === '\r')) {
      // Replace bare newline inside string with JSON escape
      result += c === '\n' ? '\\n' : '\\r';
      continue;
    }
    result += c;
  }
  return result;
}

/**
 * Attempt to repair JSON truncated mid-output (e.g. due to token limits).
 * Closes any unclosed arrays/objects so JSON.parse has a chance to succeed.
 */
function repairTruncatedJSON(str: string): string {
  // Count unclosed brackets/braces
  let inString = false;
  let escape = false;
  const stack: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (escape) { escape = false; continue; }
    if (c === '\\' && inString) { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === '{') stack.push('}');
    else if (c === '[') stack.push(']');
    else if (c === '}' || c === ']') stack.pop();
  }

  // If we're still inside a string, close it
  if (inString) str += '"';

  // Close any trailing comma before we add closing brackets
  str = str.replace(/,\s*$/, '');

  // Close unclosed structures
  while (stack.length > 0) {
    str += stack.pop();
  }

  return str;
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
