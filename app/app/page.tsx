"use client";

import { PersonalInfoForm } from "@/components/cv/personal-info-form";
import { SectionList } from "@/components/cv/section-list";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import useStore from "@/lib/store";
import { CVDocument } from "@/components/cv/pdf/cv-document";
import { pdf } from "@react-pdf/renderer";
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TemplateSelector } from "@/components/cv/template-selector";

export default function CVBuilder() {
  const { personalInfo, sections } = useStore();

  // Calculer la progression du CV
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    // Vérifier les informations personnelles
    const personalInfoFields = Object.values(personalInfo);
    total += personalInfoFields.length;
    completed += personalInfoFields.filter(Boolean).length;

    // Vérifier les sections
    total += sections.length * 3; // Chaque section devrait avoir au moins 3 champs remplis
    sections.forEach((section) => {
      const contentFields = Object.values(section.content || {});
      completed += contentFields.filter(Boolean).length;
    });

    return Math.round((completed / total) * 100) || 0;
  };

  const handleExport = useCallback(async () => {
    try {
      const blob = await pdf(
        <CVDocument personalInfo={personalInfo} sections={sections} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${personalInfo.firstName}_${personalInfo.lastName}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("CV exporté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'export du CV:", error);
      toast.error("Une erreur est survenue lors de l'export du CV");
    }
  }, [personalInfo, sections]);

  const progress = calculateProgress();

  return (
    <div className="container py-6">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Créer votre CV</h1>
            <p className="mt-1 text-muted-foreground">
              Remplissez les informations ci-dessous pour créer votre CV
              professionnel
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Exporter en PDF
            </Button>
            <TemplateSelector />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Progression du CV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="h-2" />
              <div className="min-w-[3rem] text-sm font-medium">
                {progress}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfoForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sections du CV</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
