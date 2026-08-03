import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CV Generator by Zohaib" },
      {
        name: "description",
        content: "Sign in to save your CVs in the cloud and open them again from any device.",
      },
      { property: "og:title", content: "Sign in — CV Generator by Zohaib" },
      { property: "og:description", content: "Save your CVs in the cloud and edit them anytime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn =
      mode === "in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "in" ? "Signed in" : "Account created");
    navigate({ to: "/" });
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-10 text-ink-foreground">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-7">
        <div className="mb-5 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand" />
          <span className="font-display text-xl uppercase tracking-wide">CV Generator</span>
        </div>
        <h1 className="font-display text-3xl uppercase">
          {mode === "in" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-ink-foreground/60">
          Save your CVs in the cloud and open them anytime.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={busy} className="w-full bg-brand text-brand-foreground hover:bg-brand/90">
            {mode === "in" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <Button variant="outline" className="mt-3 w-full" onClick={google}>
          Continue with Google
        </Button>

        <button
          type="button"
          className="mt-4 w-full text-sm text-ink-foreground/70 underline"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "No account? Sign up" : "Already have an account? Sign in"}
        </button>

        <Link to="/" className="mt-5 flex items-center justify-center gap-1 text-xs text-ink-foreground/50">
          <ArrowLeft className="h-3 w-3" /> Back to CV builder
        </Link>
      </div>
    </div>
  );
}
