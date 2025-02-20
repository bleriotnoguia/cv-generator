import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Star, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Créez votre CV professionnel en quelques minutes
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Un outil simple et puissant pour créer des CV qui se démarquent.
              Choisissez parmi nos modèles professionnels et personnalisez chaque détail.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/app">
                <Button size="lg" className="gap-2">
                  Créer mon CV <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tout ce dont vous avez besoin pour un CV parfait
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7">
                  <FileText className="h-5 w-5 flex-none text-primary" />
                  Modèles professionnels
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Des modèles élégants et professionnels conçus pour tous les secteurs d'activité.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7">
                  <Star className="h-5 w-5 flex-none text-primary" />
                  Personnalisation complète
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Adaptez chaque aspect de votre CV à vos besoins spécifiques.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7">
                  <Users className="h-5 w-5 flex-none text-primary" />
                  Export PDF professionnel
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Exportez votre CV en PDF haute qualité, prêt à être envoyé.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
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
            {[1, 2, 3, 4, 5, 6].map((template) => (
              <div
                key={template}
                className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-xl"
              >
                <Image
                  src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400`}
                  alt={`Template ${template}`}
                  width={400}
                  height={566}
                  className="aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary" className="w-full">
                    Utiliser ce modèle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm leading-5 text-muted-foreground">
              &copy; 2024 CV Builder. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}