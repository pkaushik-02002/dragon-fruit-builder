import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentRequirements } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are Dragon Fruit's requirement parser. Your job is to extract STRUCTURED requirements from user descriptions.

CRITICAL RULES:
1. ONLY extract what the user EXPLICITLY states. Never infer or add features.
2. If something is ambiguous, ask for clarification instead of assuming.
3. Always output in the exact JSON structure specified.
4. Be precise and deterministic - no creative additions.

Current requirements (if any):
${JSON.stringify(currentRequirements || {}, null, 2)}

OUTPUT FORMAT (always respond with valid JSON):
{
  "action": "extract" | "clarify" | "confirm",
  "message": "Your response to the user",
  "requirements": {
    "projectName": "string or null",
    "description": "string or null",
    "users": [
      {
        "role": "string",
        "description": "string",
        "permissions": ["string"]
      }
    ],
    "pages": [
      {
        "name": "string",
        "path": "string",
        "description": "string",
        "accessRoles": ["string"],
        "components": ["string"]
      }
    ],
    "dataModels": [
      {
        "name": "string",
        "fields": [
          {
            "name": "string",
            "type": "string",
            "required": boolean
          }
        ]
      }
    ],
    "workflows": [
      {
        "name": "string",
        "trigger": "string",
        "steps": ["string"]
      }
    ],
    "features": [
      {
        "name": "string",
        "description": "string",
        "priority": "must-have" | "nice-to-have"
      }
    ]
  },
  "clarifications": ["Questions to ask if action is 'clarify'"],
  "changes": ["List of what changed from previous requirements"]
}

If the user says something unclear, set action to "clarify" and ask specific questions.
If you have enough info, set action to "extract" and provide the structured requirements.
If user confirms they're ready, set action to "confirm".`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.1, // Low temperature for deterministic outputs
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Usage limit reached. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI service error');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON response
    let parsed;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      parsed = JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      parsed = {
        action: 'clarify',
        message: content,
        clarifications: ['Could you please rephrase your requirements?']
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in parse-requirements:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
