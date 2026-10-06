import { useEffect, useState } from "react";
import { Chrome, Download, Share, Smartphone, PlusSquare, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
type W = Window & { __bip?: PromptEvent | null };

const APP_HOST = "zohaibcv.lovable.app";

export function InstallAppButton({ size = "sm", className = "" }: { size?: "sm" | "lg"; className?: string }) {
  const [evt, setEvt] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [open, setOpen] = useState(false);
  const [env, setEnv] = useState({ ios: false, android: false, inApp: false });

  useEffect(() => {
    const w = window as W;
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    if (w.__bip) setEvt(w.__bip);
    const ua = navigator.userAgent;
    setEnv({
      ios: /iphone|ipad|ipod/i.test(ua),
      android: /android/i.test(ua),
      inApp: /FBAN|FBAV|Instagram|WhatsApp|Line\/|wv\)|Snapchat|TikTok/i.test(ua),
    });
    const onReady = () => setEvt(w.__bip ?? null);
    const onPrompt = (e: Event) => { e.preventDefault(); w.__bip = e as PromptEvent; setEvt(e as PromptEvent); };
    const onInstalled = () => { setInstalled(true); toast.success("CV Generator installed on your phone!"); };
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

  const install = async () => {
    if (evt) {
      await evt.prompt();
      const { outcome } = await evt.userChoice;
      if (outcome === "accepted") toast.success("Installing CV Generator…");
      (window as W).__bip = null;
      setEvt(null);
      return;
    }
    setOpen(true);
  };

  const openInChrome = () => {
    window.location.href = `intent://${APP_HOST}/#Intent;scheme=https;package=com.android.chrome;end`;
  };

  return (
    <>
      <Button size={size} onClick={install} className={`gap-2 ${className}`}>
        <Download className="h-4 w-4" /> Install App
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

          {env.android && env.inApp ? (
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
