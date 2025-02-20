"use client";

import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CVSection, PersonalInfo } from "@/lib/store";
import { formatDate } from "@/lib/utils";

Font.register({
  family: "Times-Roman",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
  },
  contact: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
  },
  itemSubtitle: {
    fontSize: 11,
    marginBottom: 2,
    fontStyle: "italic",
  },
  dates: {
    fontSize: 10,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    marginBottom: 2,
  },
  skillList: {
    fontSize: 11,
  },
});

interface ClassicTemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

export function ClassicTemplate({ personalInfo, sections }: ClassicTemplateProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

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