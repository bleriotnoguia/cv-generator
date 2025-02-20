"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette } from "lucide-react";
import Image from "next/image";
import useStore from "@/lib/store";

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Un design épuré et professionnel",
    preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Un style traditionnel et élégant",
    preview: "https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=400",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Un design moderne et créatif",
    preview: "https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=400",
  },
];

export function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          Changer de template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choisir un template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:border-primary ${
                selectedTemplate === template.id ? "border-primary" : "border-muted"
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <Image
                src={template.preview}
                alt={template.name}
                width={400}
                height={566}
                className="aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="text-white">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-white/80">{template.description}</p>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                  <div className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                    Sélectionné
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}