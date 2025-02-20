"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { CVSection, PersonalInfo } from "@/lib/store";
import { formatDate } from "@/lib/utils";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.woff",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#4A5568",
    padding: 20,
    color: "white",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: "center",
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#E2E8F0",
  },
  sidebarText: {
    fontSize: 10,
    marginBottom: 5,
    color: "#E2E8F0",
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 11,
    color: "#E2E8F0",
    marginBottom: 4,
  },
  skillList: {
    fontSize: 10,
    color: "#CBD5E0",
  },
  main: {
    flex: 1,
    padding: 30,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#2D3748",
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2D3748",
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#4A5568",
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: "#718096",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: "#4A5568",
    marginBottom: 10,
    lineHeight: 1.4,
  },
});

interface ProfessionalTemplateProps {
  personalInfo: PersonalInfo & { profileImage?: string };
  sections: CVSection[];
}

export function ProfessionalTemplate({
  personalInfo,
  sections,
}: ProfessionalTemplateProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  const skillsSection = sortedSections.find(
    (section) => section.type === "skills"
  );
  const otherSections = sortedSections.filter(
    (section) => section.type !== "skills"
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {personalInfo.profileImage && (
            <Image
              src={personalInfo.profileImage}
              style={styles.profileImage}
            />
          )}

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            <Text style={styles.sidebarText}>{personalInfo.location}</Text>
            <Text style={styles.sidebarText}>{personalInfo.phone}</Text>
            <Text style={styles.sidebarText}>{personalInfo.email}</Text>
          </View>

          {skillsSection && skillsSection.content.categories?.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skillsSection.content.categories.map(
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
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <Text style={styles.title}>{personalInfo.title}</Text>

          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.description}>{personalInfo.summary}</Text>
            </View>
          )}

          {otherSections.map((section) => (
            <View key={section.id} style={styles.section}>
              {section.type === "experience" && (
                <>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
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
                        : "Present"}
                    </Text>
                    <Text style={styles.description}>
                      {section.content.description}
                    </Text>
                  </View>
                </>
              )}

              {section.type === "education" && (
                <>
                  <Text style={styles.sectionTitle}>Education</Text>
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
                        : "Present"}
                    </Text>
                    {section.content.description && (
                      <Text style={styles.description}>
                        {section.content.description}
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
