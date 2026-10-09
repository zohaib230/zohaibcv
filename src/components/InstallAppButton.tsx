import { useEffect, useState } from "react";
import { Chrome, Download, Share, Smartphone, PlusSquare, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
type W = Window & { __bip?: PromptEvent | null };

const APP_HOST = "zohaibcv.lovable.app";

type NavWithApps = Navigator & { getInstalledRelatedApps?: () => Promise<unknown[]> };

function waitForPrompt(ms: number): Promise<PromptEvent | null> {
  const w = window as W;
  if (w.__bip) return Promise.resolve(w.__bip);
  return new Promise((resolve) => {
    const done = () => { window.removeEventListener("bip-ready", done); clearTimeout(t); resolve(w.__bip ?? null); };
    const t = setTimeout(done, ms);
    window.addEventListener("bip-ready", done);
  });
}

export function InstallAppButton({ size = "sm", className = "" }: { size?: "sm" | "lg"; className?: string }) {
  const [evt, setEvt] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [alreadyOnDevice, setAlreadyOnDevice] = useState(false);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [env, setEnv] = useState({ ios: false, android: false, inApp: false, desktop: false, framed: false });

  useEffect(() => {
    const w = window as W;
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone) setInstalled(true);
    if (w.__bip) setEvt(w.__bip);
    const nav = navigator as NavWithApps;
    nav.getInstalledRelatedApps?.().then((apps) => { if (apps.length) setAlreadyOnDevice(true); }).catch(() => {});
    const ua = navigator.userAgent;
    setEnv({
      ios: /iphone|ipad|ipod/i.test(ua),
      android: /android/i.test(ua),
      inApp: /FBAN|FBAV|Instagram|WhatsApp|Line\/|wv\)|Snapchat|TikTok/i.test(ua),
      desktop: !/android|iphone|ipad|ipod|mobile/i.test(ua),
      framed: window.self !== window.top || location.hostname !== APP_HOST,
    });
    const onReady = () => setEvt(w.__bip ?? null);
    const onPrompt = (e: Event) => { e.preventDefault(); w.__bip = e as PromptEvent; setEvt(e as PromptEvent); };
    const onInstalled = () => { setInstalled(true); w.__bip = null; toast.success("CV Generator installed! Open it from your home screen or app list."); };
    window.addEventListener("bip-ready", onReady);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("bip-ready", onReady);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const runPrompt = async (p: PromptEvent) => {
    try {
      await p.prompt();
      const { outcome } = await p.userChoice;
      if (outcome === "accepted") toast.success("Installing CV Generator…");
    } catch {
      setOpen(true);
    } finally {
      (window as W).__bip = null;
      setEvt(null);
    }
  };

  const install = async () => {
    if (evt) return runPrompt(evt);
    if (alreadyOnDevice) {
      toast.success("CV Generator is already installed on this device. Open it from your home screen or app list.");
      return;
    }
    if (env.framed || env.ios || (env.android && env.inApp)) { setOpen(true); return; }
    // The browser may still be preparing the install prompt — wait briefly, then install in one tap.
    setBusy(true);
    const p = await waitForPrompt(2500);
    setBusy(false);
    if (p) return runPrompt(p);
    setOpen(true);
  };

  const openInChrome = () => {
    window.location.href = `intent://${APP_HOST}/#Intent;scheme=https;package=com.android.chrome;end`;
  };

  return (
    <>
      <Button size={size} onClick={install} disabled={busy} className={`gap-2 ${className}`}>
        <Download className={`h-4 w-4 ${busy ? "animate-bounce" : ""}`} /> {busy ? "Installing…" : "Install App"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-lg">
              <Smartphone className="h-8 w-8" />
            </div>
            <DialogTitle className="text-center">Install CV Generator</DialogTitle>
            <DialogDescription className="text-center">
              Free • No Play Store needed • Opens like a normal app
            </DialogDescription>
          </DialogHeader>

          {env.framed ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Installing works only on the live website. Open it in a new tab, then press Install App again.
              </p>
              <Button className="w-full gap-2" onClick={() => window.open(`https://${APP_HOST}`, "_blank", "noopener")}>
                <Download className="h-4 w-4" /> Open live website
              </Button>
            </div>
          ) : env.desktop ? (
            <ol className="space-y-3 text-sm">
              <Step n={1} icon={<Chrome className="h-4 w-4" />}>Use <b>Google Chrome</b> or <b>Microsoft Edge</b></Step>
              <Step n={2} icon={<Download className="h-4 w-4" />}>Click the <b>install icon</b> at the right end of the address bar</Step>
              <Step n={3} icon={<MoreVertical className="h-4 w-4" />}>Or open menu <b>⋮</b> → <b>Cast, save and share</b> → <b>Install page as app</b></Step>
              <p className="text-xs text-muted-foreground">Firefox and Safari on PC do not support installing web apps.</p>
            </ol>
          ) : env.android && env.inApp ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You opened the link inside another app. Open it in Chrome to install with one tap.
              </p>
              <Button className="w-full gap-2" onClick={openInChrome}>
                <Chrome className="h-4 w-4" /> Open in Chrome
              </Button>
            </div>
          ) : env.ios ? (
            <ol className="space-y-3 text-sm">
              <Step n={1} icon={<Share className="h-4 w-4" />}>Tap the <b>Share</b> button in Safari</Step>
              <Step n={2} icon={<PlusSquare className="h-4 w-4" />}>Choose <b>Add to Home Screen</b></Step>
              <Step n={3} icon={<Smartphone className="h-4 w-4" />}>Tap <b>Add</b> — done!</Step>
              <p className="text-xs text-muted-foreground">Apple only allows installing from Safari.</p>
            </ol>
          ) : (
            <ol className="space-y-3 text-sm">
              <Step n={1} icon={<MoreVertical className="h-4 w-4" />}>Tap the browser menu <b>⋮</b></Step>
              <Step n={2} icon={<Download className="h-4 w-4" />}>Tap <b>Install app</b></Step>
              <Step n={3} icon={<Smartphone className="h-4 w-4" />}>The app appears on your home screen</Step>
              {env.android && (
                <Button variant="outline" className="w-full gap-2" onClick={openInChrome}>
                  <Chrome className="h-4 w-4" /> Open in Chrome for one-tap install
                </Button>
              )}
            </ol>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">{n}</span>
      <span className="flex-1">{children}</span>
      <span className="text-muted-foreground">{icon}</span>
    </li>
  );
}
