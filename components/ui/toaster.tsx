"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      toastOptions={{
        className:
          "rounded-2xl border border-border bg-background text-foreground shadow-lg px-4 py-3 text-sm",
        style: { background: "white" }
      }}
    />
  );
}
