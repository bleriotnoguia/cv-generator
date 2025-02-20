"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isAppPage = pathname === "/app";

  return (
    <header className="border-b">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between mx-auto">
        <Link href="/" className="font-bold text-xl sm:text-2xl uppercase">
          CV Generator
        </Link>
        <nav>
          {!isAppPage ? (
            <Link href="/app">
              <Button className="text-sm sm:text-base">Créer mon CV</Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="ghost" className="text-sm sm:text-base">
                Retour à l&apos;accueil
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
