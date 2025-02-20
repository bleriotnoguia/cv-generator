"use client";

import { CVSection } from "@/lib/store";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus } from "lucide-react";
import useStore from "@/lib/store";
import { ExperienceForm } from "./sections/experience-form";
import { EducationForm } from "./sections/education-form";
import { SkillsForm } from "./sections/skills-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SECTION_TYPES = [
  { type: "experience", label: "Expérience professionnelle" },
  { type: "education", label: "Formation" },
  { type: "skills", label: "Compétences" },
] as const;

export function SectionList() {
  const { sections, addSection, reorderSections } = useStore();
  const [isExpanded, setIsExpanded] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSections = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    reorderSections(reorderedSections);
  };

  const handleAddSection = (type: CVSection["type"]) => {
    const newSection: CVSection = {
      id: crypto.randomUUID(),
      type,
      order: sections.length,
      content: {},
    };
    addSection(newSection);
    setIsExpanded(newSection.id);
  };

  const renderSectionForm = (section: CVSection) => {
    switch (section.type) {
      case "experience":
        return <ExperienceForm section={section} />;
      case "education":
        return <EducationForm section={section} />;
      case "skills":
        return <SkillsForm section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cv-sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "rounded-lg border bg-card",
                        snapshot.isDragging && "shadow-lg"
                      )}
                    >
                      <div className="flex items-center gap-2 p-4">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab rounded p-1 hover:bg-accent active:cursor-grabbing"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setIsExpanded(isExpanded === section.id ? null : section.id)}
                        >
                          <h3 className="text-lg font-semibold">
                            {SECTION_TYPES.find((t) => t.type === section.type)?.label}
                          </h3>
                        </div>
                      </div>
                      {isExpanded === section.id && (
                        <div className="border-t p-4">
                          {renderSectionForm(section)}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {sections.length === 0 && (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground">
                    Aucune section ajoutée. Utilisez les boutons ci-dessous pour ajouter des sections à votre CV.
                  </p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex flex-wrap gap-2">
        {SECTION_TYPES.map((sectionType) => (
          <Button
            key={sectionType.type}
            variant="outline"
            onClick={() => handleAddSection(sectionType.type)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter {sectionType.label}
          </Button>
        ))}
      </div>
    </div>
  );
}