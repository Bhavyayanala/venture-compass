import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User, Trash2, Copy, Lightbulb, Check } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, SectionCard } from "@/components/bi/primitives";
import { advisorReply, advisorSuggestions, DEFAULT_LOCATION } from "@/lib/mock-data";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI Advisor — BizIntel AI" },
      {
        name: "description",
        content: "Interactive AI Business Advisor for location intelligence and strategy.",
      },
    ],
  }),
  component: AiAdvisorPage,
});

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

export function AiAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: `Hello! I am your AI Business Advisor for **${DEFAULT_LOCATION}**. Ask me anything regarding business model recommendations, risk mitigations, revenue projections, or location dynamics.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (questionText: string) => {
    const text = questionText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = advisorReply(text);
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: `Hello! I am your AI Business Advisor for **${DEFAULT_LOCATION}**. Ask me anything regarding business model recommendations, risk mitigations, revenue projections, or location dynamics.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    toast.success("Chat history cleared");
  };

  const handleCopy = () => {
    const fullText = messages.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n\n");
    navigator.clipboard.writeText(fullText);
    toast.success("Conversation copied to clipboard");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="AI Business Advisor"
        subtitle={`Real-time decision intelligence & guidance for ${DEFAULT_LOCATION}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="size-4" /> Copy Chat
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="size-4 text-muted-foreground" /> Clear
            </Button>
          </div>
        }
      />

      {/* Suggested Prompts Pill Container */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Lightbulb className="size-3.5 text-warning" /> Suggested Questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {advisorSuggestions.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              size="sm"
              className="text-xs bg-muted/40 hover:bg-primary/10"
              onClick={() => handleSend(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Chat Box Container */}
      <SectionCard title="Advisor Chat Interface" icon={Bot}>
        <div className="flex flex-col h-[520px] justify-between">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <Avatar className="size-8 border border-primary/40 bg-gradient-primary">
                    <AvatarFallback className="text-primary-foreground font-bold text-xs">
                      <Sparkles className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted/60 text-foreground border border-border/60 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[10px] opacity-70 mt-2 text-right">{msg.time}</span>
                </div>

                {msg.sender === "user" && (
                  <Avatar className="size-8 border border-border bg-accent">
                    <AvatarFallback className="text-foreground font-bold text-xs">
                      <User className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-muted-foreground text-xs p-2">
                <Bot className="size-4 animate-bounce text-primary" />
                <span>AI Advisor is thinking...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2 pt-4 border-t border-border mt-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about financial viability, competition, or location..."
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || loading}>
              <Send className="size-4" />
              <span className="hidden sm:inline ml-1">Send</span>
            </Button>
          </form>
        </div>
      </SectionCard>
    </div>
  );
}
