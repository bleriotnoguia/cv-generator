import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Star, Users } from "lucide-react";
import Link from "next/link";
import { TemplateGallery } from "@/components/template-gallery";

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
              Choisissez parmi nos modèles professionnels et personnalisez
              chaque détail.
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
                    Des modèles élégants et professionnels conçus pour tous les
                    secteurs d&apos;activité.
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
      <TemplateGallery />

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0 flex flex-row justify-center items-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} CV Generator. Tous droits
              réservés.
            </p>{" "}
            <span className="mx-2 0">|</span>
            <p className=" italic">
              Par{" "}
              <Link
                href="https://bleriotnoguia.com"
                className="underline"
                target="_blank"
              >
                Blériot Noguia
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
