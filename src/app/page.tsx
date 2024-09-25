"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const dummyData = Array.from(Array(40)).map((_, index) => `Message ${index}`);

export default function Home() {
  const [messages, setMessages] = useState<string[]>(dummyData);

  return (
    <main className="h-dvh">
      <div className="h-full flex flex-col">
        <div className="bg-slate-100 flex-1 flex flex-col gap-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <Button>Test</Button>
      </div>
    </main>
  );
}
