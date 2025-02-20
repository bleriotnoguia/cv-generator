"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CVSection } from "@/lib/store";
import useStore from "@/lib/store";
import { toast } from "sonner";
import { X } from "lucide-react";

const skillsSchema = z.object({
  categories: z
    .array(
      z.object({
        name: z.string().min(1, "Le nom de la catégorie est requis"),
        skills: z.array(z.string().min(1, "La compétence est requise")),
      })
    )
    .default([]),
});

type SkillsFormProps = {
  section: CVSection;
};

export function SkillsForm({ section }: SkillsFormProps) {
  const { updateSection } = useStore();

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      categories: section.content?.categories || [{ name: "", skills: [""] }],
    },
  });

  const {
    fields: categories,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  function onSubmit(values: z.infer<typeof skillsSchema>) {
    updateSection(section.id, { content: values });
    toast.success("Compétences mises à jour");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
        {categories.map((category, categoryIndex) => (
          <div key={category.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Langages de programmation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => removeCategory(categoryIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {form.getFieldState(`categories.${categoryIndex}.skills`).error && (
              <p className="text-sm text-destructive">
                {
                  form.getFieldState(`categories.${categoryIndex}.skills`).error
                    ?.message
                }
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {form
                .getValues(`categories.${categoryIndex}.skills`)
                ?.map((_, skillIndex) => (
                  <FormField
                    key={skillIndex}
                    control={form.control}
                    name={`categories.${categoryIndex}.skills.${skillIndex}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Ex: JavaScript"
                              {...field}
                              className="w-32"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const skills = form.getValues(
                                  `categories.${categoryIndex}.skills`
                                );
                                form.setValue(
                                  `categories.${categoryIndex}.skills`,
                                  skills.filter((_, i) => i !== skillIndex)
                                );
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const skills =
                    form.getValues(`categories.${categoryIndex}.skills`) || [];
                  form.setValue(`categories.${categoryIndex}.skills`, [
                    ...skills,
                    "",
                  ]);
                }}
              >
                Ajouter une compétence
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => appendCategory({ name: "", skills: [""] })}
        >
          Ajouter une catégorie
        </Button>

        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
