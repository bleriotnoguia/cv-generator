"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Un CV moderne et élégant",
    preview:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Un CV classique et élégant",
    preview:
      "https://images.unsplash.com/photo-1696952384801-079962407b0d?q=80&w=400",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Un CV créatif et original",
    preview:
      "https://images.unsplash.com/photo-1444427169197-de497742b62d?q=80&w=400",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Un CV professionnel et élégant",
    preview:
      "https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=400",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Un CV créatif et original",
    preview:
      "https://images.unsplash.com/photo-1724304406928-c43b01912fa1?q=80&w=400",
  },
];

export function TemplateGallery() {
  const { setTemplate } = useStore();
  const router = useRouter();

  const handleUseTemplate = (templateId: string) => {
    setTemplate(templateId);
    router.push("/app");
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nos modèles de CV
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez parmi notre sélection de modèles professionnels
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-xl"
            >
              <Image
                src={template.preview}
                alt={`Template ${template.name}`}
                width={400}
                height={566}
                className="aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="font-bold text-white text-2xl">
                  {template.name}
                </h3>
                <p className="text-sm text-white/80">{template.description}</p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Utiliser ce modèle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
