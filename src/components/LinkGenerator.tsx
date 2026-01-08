import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const LinkGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!prompt.trim()) return "";
    const baseUrl = window.location.origin;
    const encoded = encodeURIComponent(prompt.trim());
    return `${baseUrl}/?q=${encoded}`;
  };

  const handleCopy = () => {
    const link = generateLink();
    if (!link) {
      toast.error("Enter a prompt first!");
      return;
    }
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generatedLink = generateLink();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Let Me Ask That On ChatGPT For You</h1>
        <p className="text-muted-foreground">
          For when your friends need a gentle reminder that AI exists.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Enter the question they should've asked
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How do I center a div?"
            className="min-h-[100px] bg-secondary border-border resize-none"
          />
        </div>

        {generatedLink && (
          <div className="p-4 rounded-lg bg-card border border-border">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Your passive-aggressive link
            </label>
            <a 
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm break-all text-primary hover:underline"
            >
              {generatedLink}
            </a>
          </div>
        )}

        <Button
          onClick={handleCopy}
          className="w-full h-12 text-base"
          disabled={!prompt.trim()}
        >
          {copied ? (
            <>
              <Check className="mr-2" size={18} />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2" size={18} />
              Copy Link
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        A playful tribute to{" "}
        <a
          href="https://lmgtfy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          lmgtfy.com
        </a>
      </p>
    </div>
  );
};
