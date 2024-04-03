//! THIS IS ONLY A PROOF OF CONCEPT, DO NOT USE THIS IN PRODUCTION!
//! THIS SHOULD ME MOVED TO A PROTECTED ROUTE FOR PRODUCTION

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { env } from "~/env";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  baseURL:
    env.NODE_ENV === "production"
      ? "http://llm:11434/v1" // This is the hosname of the Ollama container
      : "http://localhost:11434/v1",
  apiKey: "ollama",
});

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "llama2",
    stream: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
