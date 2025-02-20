"use client";

import useStore from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TEMPLATE_STYLES = {
  modern: {
    header: "mb-8 text-center",
    name: "mb-2 text-2xl font-bold",
    title: "text-lg font-medium text-primary",
    contact: "mt-2 text-sm text-muted-foreground",
    section: "mb-8",
    sectionTitle: "mb-4 text-lg font-semibold",
    itemTitle: "font-medium",
    itemSubtitle: "text-primary",
    dates: "text-sm text-muted-foreground",
    description: "mt-2 text-sm",
    skillCategory: "",
    skillCategoryTitle: "font-medium",
    skillList: "text-sm text-muted-foreground",
  },
  classic: {
    header: "mb-10 text-center",
    name: "mb-2 text-3xl font-serif",
    title: "text-lg italic text-primary",
    contact: "mt-2 text-sm text-muted-foreground",
    section: "mb-8",
    sectionTitle: "mb-4 border-b pb-1 text-xl font-serif uppercase",
    itemTitle: "font-serif font-medium",
    itemSubtitle: "italic text-primary",
    dates: "text-sm text-muted-foreground",
    description: "mt-2 text-sm leading-relaxed",
    skillCategory: "",
    skillCategoryTitle: "font-serif font-medium",
    skillList: "text-sm text-muted-foreground",
  },
  creative: {
    header: "mb-10 -mx-6 -mt-6 bg-primary p-8 text-primary-foreground",
    name: "mb-2 text-3xl font-bold",
    title: "text-xl opacity-90",
    contact: "mt-2 text-sm opacity-80",
    section: "mb-8",
    sectionTitle: "mb-4 border-l-4 border-primary pl-3 text-lg font-semibold",
    itemTitle: "font-medium",
    itemSubtitle: "text-primary",
    dates: "text-sm text-muted-foreground",
    description: "mt-2 text-sm leading-relaxed",
    skillCategory: "",
    skillCategoryTitle: "font-medium",
    skillList: "text-sm text-muted-foreground",
  },
};

export function CVPreview() {
  const { personalInfo, sections, selectedTemplate } = useStore();
  const styles = TEMPLATE_STYLES[selectedTemplate as keyof typeof TEMPLATE_STYLES];
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto min-h-full w-[21cm] bg-white p-[2cm] shadow-inner">
      {/* En-tête */}
      <div className={styles.header}>
        <h1 className={styles.name}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className={styles.title}>{personalInfo.title}</p>
        <div className={styles.contact}>
          <p>{personalInfo.location}</p>
          <p>{personalInfo.email} • {personalInfo.phone}</p>
        </div>
      </div>

      {/* Résumé */}
      {personalInfo.summary && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Profil</h2>
          <p className="text-muted-foreground">{personalInfo.summary}</p>
        </div>
      )}

      {/* Sections */}
      {sortedSections.map((section) => (
        <div key={section.id} className={styles.section}>
          {section.type === "experience" && (
            <>
              <h2 className={styles.sectionTitle}>Expérience professionnelle</h2>
              <div className="space-y-4">
                <div>
                  <h3 className={styles.itemTitle}>{section.content.position}</h3>
                  <p className={styles.itemSubtitle}>{section.content.company}</p>
                  <p className={styles.dates}>
                    {formatDate(section.content.startDate)} - {section.content.endDate ? formatDate(section.content.endDate) : "Présent"}
                  </p>
                  <p className={styles.description}>{section.content.description}</p>
                </div>
              </div>
            </>
          )}

          {section.type === "education" && (
            <>
              <h2 className={styles.sectionTitle}>Formation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className={styles.itemTitle}>{section.content.degree}</h3>
                  <p className={styles.itemSubtitle}>{section.content.school}</p>
                  <p className={styles.dates}>
                    {formatDate(section.content.startDate)} - {section.content.endDate ? formatDate(section.content.endDate) : "Présent"}
                  </p>
                  {section.content.description && (
                    <p className={styles.description}>{section.content.description}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {section.type === "skills" && section.content.categories?.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>Compétences</h2>
              <div className="space-y-4">
                {section.content.categories.map((category: any, index: number) => (
                  <div key={index} className={styles.skillCategory}>
                    <h3 className={styles.skillCategoryTitle}>{category.name}</h3>
                    <p className={styles.skillList}>
                      {category.skills.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}