"use client";

import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CVSection, PersonalInfo } from "@/lib/store";
import { formatDate } from "@/lib/utils";

Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#666",
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  skillList: {
    fontSize: 10,
    color: "#666",
  },
});

interface ModernTemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

export function ModernTemplate({ personalInfo, sections }: ModernTemplateProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <Text style={styles.contact}>{personalInfo.location}</Text>
          <Text style={styles.contact}>
            {personalInfo.email} • {personalInfo.phone}
          </Text>
        </View>

        {/* Résumé */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Sections */}
        {sortedSections.map((section) => (
          <View key={section.id} style={styles.section}>
            {section.type === "experience" && (
              <>
                <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
                <View style={styles.section}>
                  <Text style={styles.itemTitle}>{section.content.position}</Text>
                  <Text style={styles.itemSubtitle}>{section.content.company}</Text>
                  <Text style={styles.dates}>
                    {formatDate(section.content.startDate)} -{" "}
                    {section.content.endDate
                      ? formatDate(section.content.endDate)
                      : "Présent"}
                  </Text>
                  <Text style={styles.description}>{section.content.description}</Text>
                </View>
              </>
            )}

            {section.type === "education" && (
              <>
                <Text style={styles.sectionTitle}>Formation</Text>
                <View style={styles.section}>
                  <Text style={styles.itemTitle}>{section.content.degree}</Text>
                  <Text style={styles.itemSubtitle}>{section.content.school}</Text>
                  <Text style={styles.dates}>
                    {formatDate(section.content.startDate)} -{" "}
                    {section.content.endDate
                      ? formatDate(section.content.endDate)
                      : "Présent"}
                  </Text>
                  {section.content.description && (
                    <Text style={styles.description}>
                      {section.content.description}
                    </Text>
                  )}
                </View>
              </>
            )}

            {section.type === "skills" &&
              section.content.categories?.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Compétences</Text>
                  {section.content.categories.map((category: any, index: number) => (
                    <View key={index} style={styles.skillCategory}>
                      <Text style={styles.skillCategoryName}>{category.name}</Text>
                      <Text style={styles.skillList}>
                        {category.skills.join(" • ")}
                      </Text>
                    </View>
                  ))}
                </>
              )}
          </View>
        ))}
      </Page>
    </Document>
  );
}