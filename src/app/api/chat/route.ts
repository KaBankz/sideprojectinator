//! THIS IS ONLY A PROOF OF CONCEPT, DO NOT USE THIS IN PRODUCTION!
//! THIS SHOULD ME MOVED TO A PROTECTED ROUTE FOR PRODUCTION

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { env } from "~/env";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  baseURL: env.LLM_HOST_URL,
  apiKey: env.LLM_HOST_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: [
      {
        role: "user" | "assistant";
        content: string;
      },
    ];
  };

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: env.LLM,
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
