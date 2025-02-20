"use client";

import React from "react";
import { CVSection, PersonalInfo } from "@/lib/store";
import { ModernTemplate } from "./templates/modern";
import { ClassicTemplate } from "./templates/classic";
import { CreativeTemplate } from "./templates/creative";
import { ProfessionalTemplate } from "./templates/professional";

interface CVDocumentProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  selectedTemplate: string;
}

export function CVDocument({
  personalInfo,
  sections,
  selectedTemplate,
}: CVDocumentProps) {
  switch (selectedTemplate) {
    case "classic":
      return (
        <ClassicTemplate personalInfo={personalInfo} sections={sections} />
      );
    case "creative":
      return (
        <CreativeTemplate personalInfo={personalInfo} sections={sections} />
      );
    case "professional":
      return (
        <ProfessionalTemplate personalInfo={personalInfo} sections={sections} />
      );
    default:
      return <ModernTemplate personalInfo={personalInfo} sections={sections} />;
  }
}
