import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallAppButton({ size = "sm", className = "" }: { size?: "sm" | "lg"; className?: string }) {
  const [evt, setEvt] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as PromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const install = async () => {
    if (evt) {
      await evt.prompt();
      const { outcome } = await evt.userChoice;
      if (outcome === "accepted") toast.success("CV Generator is installing on your phone");
      setEvt(null);
      return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    toast.info(
      ios
        ? "On iPhone: tap the Share button in Safari, then 'Add to Home Screen'."
        : "Open your browser menu (⋮) and tap 'Install app' or 'Add to Home screen'.",
      { duration: 8000 },
    );
  };

  return (
    <Button size={size} variant="outline" onClick={install} className={`gap-2 ${className}`}>
      <Smartphone className="h-4 w-4" /> Install App
    </Button>
  );
}
