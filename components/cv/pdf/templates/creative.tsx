"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CVSection, PersonalInfo } from "@/lib/store";
import { formatDate } from "@/lib/utils";

Font.register({
  family: "Roboto",
  src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-black-webfont.woff",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#1a365d",
    padding: 30,
    marginLeft: -40,
    marginRight: -40,
    marginTop: -40,
    marginBottom: 30,
  },
  name: {
    fontSize: 32,
    color: "white",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: "#e2e8f0",
    marginBottom: 12,
  },
  contact: {
    fontSize: 11,
    color: "#e2e8f0",
    marginBottom: 4,
  },
  content: {
    padding: "0 20px",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#1a365d",
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1a365d",
    paddingLeft: 8,
  },
  itemTitle: {
    fontSize: 14,
    color: "#2d3748",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#4a5568",
    marginBottom: 2,
  },
  dates: {
    fontSize: 11,
    color: "#718096",
    marginBottom: 6,
  },
  description: {
    fontSize: 11,
    color: "#4a5568",
    marginBottom: 12,
    lineHeight: 1.5,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryName: {
    fontSize: 12,
    color: "#2d3748",
    marginBottom: 4,
  },
  skillList: {
    fontSize: 11,
    color: "#4a5568",
  },
});

interface CreativeTemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

export function CreativeTemplate({
  personalInfo,
  sections,
}: CreativeTemplateProps) {
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

        <View style={styles.content}>
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
                  <Text style={styles.sectionTitle}>
                    Expérience professionnelle
                  </Text>
                  <View style={styles.section}>
                    <Text style={styles.itemTitle}>
                      {section.content.position}
                    </Text>
                    <Text style={styles.itemSubtitle}>
                      {section.content.company}
                    </Text>
                    <Text style={styles.dates}>
                      {formatDate(section.content.startDate)} -{" "}
                      {section.content.endDate
                        ? formatDate(section.content.endDate)
                        : "Présent"}
                    </Text>
                    <Text style={styles.description}>
                      {section.content.description}
                    </Text>
                  </View>
                </>
              )}

              {section.type === "education" && (
                <>
                  <Text style={styles.sectionTitle}>Formation</Text>
                  <View style={styles.section}>
                    <Text style={styles.itemTitle}>
                      {section.content.degree}
                    </Text>
                    <Text style={styles.itemSubtitle}>
                      {section.content.school}
                    </Text>
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
                    {section.content.categories.map(
                      (category: any, index: number) => (
                        <View key={index} style={styles.skillCategory}>
                          <Text style={styles.skillCategoryName}>
                            {category.name}
                          </Text>
                          <Text style={styles.skillList}>
                            {category.skills.join(" • ")}
                          </Text>
                        </View>
                      )
                    )}
                  </>
                )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
