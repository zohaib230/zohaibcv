import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CV Generator by Zohaib" },
      {
        name: "description",
        content:
          "Create an account with just a username and password to save your CVs privately and open them again from any device.",
      },
      { property: "og:title", content: "Sign in — CV Generator by Zohaib" },
      { property: "og:description", content: "Save your CVs privately and edit them anytime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

/** Usernames are turned into a private, fixed internal address for login. */
const USER_DOMAIN = "zohaibcv.app";
const normalize = (u: string) =>
  u
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "");
const toEmail = (u: string) => `${normalize(u)}@${USER_DOMAIN}`;

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = normalize(username);
    if (u.length < 3) {
      toast.error("Username must be at least 3 letters (a–z, 0–9)");
      return;
    }
    setBusy(true);

    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({
        email: toEmail(u),
        password,
      });
      setBusy(false);
      if (error) {
        toast.error("Wrong username or password");
        return;
      }
      toast.success("Signed in");
      navigate({ to: "/builder" });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: toEmail(u),
      password,
    });
    if (error) {
      setBusy(false);
      toast.error(
        error.message.toLowerCase().includes("already")
          ? "That username is already taken"
          : error.message,
      );
      return;
    }

    if (data.user) {
      const { error: pErr } = await supabase
        .from("profiles")
        .insert({ id: data.user.id, username: u, display_name: username.trim() });
      if (pErr && !pErr.message.includes("duplicate")) {
        setBusy(false);
        toast.error("That username is already taken");
        return;
      }
    }

    setBusy(false);
    toast.success("Account created — your CVs are private to you");
    navigate({ to: "/builder" });
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
          Just a username and password — no email needed. Your CVs stay private to your account.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              required
              autoComplete="username"
              placeholder="zohaib123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "in" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-sm text-ink-foreground/70 underline"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "No account? Sign up" : "Already have an account? Sign in"}
        </button>

        <p className="mt-3 text-center text-[11px] text-ink-foreground/40">
          Remember your password — there is no email recovery for username accounts.
        </p>

        <Link to="/" className="mt-5 flex items-center justify-center gap-1 text-xs text-ink-foreground/50">
          <ArrowLeft className="h-3 w-3" /> Back to home
        </Link>
      </div>
    </div>
  );
}
