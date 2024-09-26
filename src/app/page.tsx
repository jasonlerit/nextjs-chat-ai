"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuLoader, LuSend } from "react-icons/lu";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "What is A.I in one sentence?",
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    if (response.body !== null) {
      const reader = response.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        setMessage((pv) => pv.concat(chunk));
      }
    }
    setLoading(false);
  };

  return (
    <main className="h-dvh">
      <div className="h-full flex flex-col">
        <div className="bg-slate-100 flex-1 flex flex-col gap-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          {message}
        </div>
        <Button onClick={() => handleSubmit()} disabled={loading}>
          {loading ? <LuLoader className="animate-spin" /> : <LuSend />}
        </Button>
      </div>
    </main>
  );
}
