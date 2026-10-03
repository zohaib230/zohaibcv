import { Copy, Share2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const APP_URL = "https://zohaibcv.lovable.app";
const MSG = `Make a professional CV for free in 2 minutes and install the app on your phone: ${APP_URL}`;

export function ShareAppBox() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      toast.success("Link copied");
    } catch {
      toast.info(APP_URL);
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "CV Generator by Zohaib", text: MSG, url: APP_URL });
      } catch { /* cancelled */ }
    } else void copy();
  };
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3 text-left">
      <p className="text-sm font-semibold">Share this free app with friends</p>
      <p className="mb-2 text-xs text-muted-foreground">
        Anyone who opens this link can make a CV and install the app on their phone.
      </p>
      <div className="mb-2 flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5">
        <span className="flex-1 truncate text-xs">{APP_URL}</span>
        <Button size="sm" variant="ghost" onClick={() => void copy()} aria-label="Copy link">
          <Copy />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="outline" asChild>
          <a href={`https://wa.me/?text=${encodeURIComponent(MSG)}`} target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp
          </a>
        </Button>
        <Button size="sm" variant="outline" onClick={() => void share()}>
          <Share2 /> Share link
        </Button>
      </div>
    </div>
  );
}
