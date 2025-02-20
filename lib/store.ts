import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CVSection {
  id: string;
  type: "experience" | "education" | "skills" | "languages" | "projects";
  order: number;
  content: Record<string, any>;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
}

interface CVStore {
  selectedTemplate: string;
  personalInfo: PersonalInfo;
  sections: CVSection[];
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addSection: (section: CVSection) => void;
  updateSection: (id: string, content: Partial<CVSection>) => void;
  removeSection: (id: string) => void;
  reorderSections: (sections: CVSection[]) => void;
  setTemplate: (template: string) => void;
}

const useStore = create<CVStore>()(
  persist(
    (set) => ({
      selectedTemplate: "modern",
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        title: "",
        summary: "",
      },
      sections: [],
      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
      addSection: (section) =>
        set((state) => ({
          sections: [...state.sections, section],
        })),
      updateSection: (id, content) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, ...content } : section
          ),
        })),
      removeSection: (id) =>
        set((state) => ({
          sections: state.sections.filter((section) => section.id !== id),
        })),
      reorderSections: (sections) =>
        set({
          sections,
        }),
      setTemplate: (template) =>
        set({
          selectedTemplate: template,
        }),
    }),
    {
      name: "cv-storage",
    }
  )
);

export default useStore;