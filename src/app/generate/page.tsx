"use client";

import { useChat } from "ai/react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/ollama",
    });

  return (
    <div className="mx-auto flex h-screen max-h-[calc(100vh-3.5rem)] w-full max-w-md flex-col bg-gray-200">
      <div className="flex flex-col items-center justify-center gap-1 bg-gray-300 py-4 text-center text-xs">
        <Avatar>
          <AvatarFallback className="text-xl">🤖</AvatarFallback>
        </Avatar>
        <h1>A.I Chat</h1>
      </div>

      <div className="overflow-scroll px-2">
        {messages.map((m) => (
          <div key={m.id} className="my-2 whitespace-pre-wrap">
            {m.role === "user" ? (
              <div className="flex justify-end">
                <div className="w-fit rounded-xl rounded-br-none bg-blue-600 p-2 text-right text-white">
                  <span>{m.content}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="w-fit rounded-xl rounded-bl-none bg-gray-500 p-2 text-left text-white">
                  <span>{m.content}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="my-2 flex justify-start">
            <div className="text-left">
              <div className="w-fit rounded-xl rounded-bl-none bg-gray-500 p-2 text-left text-white">
                <span>⚪️⚪️⚪️</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="my-2 flex justify-start">
            <div className="text-left">
              <div className="w-fit rounded-xl rounded-bl-none bg-red-500 p-2 text-left text-white">
                <span>{error?.message}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-4 w-full max-w-md rounded-full border border-gray-300 px-4 py-2"
          value={input}
          placeholder="AiMessage"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
