"use client";

import { Toaster } from "@/components/ui/sonner";
import { CVPreview } from "@/components/cv/preview/cv-preview";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[1fr,600px]">
      <main className="mx-auto h-full w-full max-w-4xl overflow-auto px-6">
        {children}
      </main>
      <div className="h-full overflow-auto border-l bg-white">
        <CVPreview />
      </div>
      <Toaster />
    </div>
  );
}