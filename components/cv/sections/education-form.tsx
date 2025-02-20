"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { CVSection } from "@/lib/store";
import useStore from "@/lib/store";
import { toast } from "sonner";

const educationSchema = z.object({
  school: z.string().min(1, "L'établissement est requis"),
  degree: z.string().min(1, "Le diplôme est requis"),
  field: z.string().min(1, "Le domaine d'études est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

type EducationFormProps = {
  section: CVSection;
};

export function EducationForm({ section }: EducationFormProps) {
  const { updateSection } = useStore();

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: section.content?.school || "",
      degree: section.content?.degree || "",
      field: section.content?.field || "",
      startDate: section.content?.startDate || "",
      endDate: section.content?.endDate || "",
      description: section.content?.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof educationSchema>) {
    updateSection(section.id, { content: values });
    toast.success("Formation mise à jour");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Établissement</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'établissement" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diplôme</FormLabel>
                <FormControl>
                  <Input placeholder="Master, License, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domaine d&apos;études</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informatique, Commerce, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input type="month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input type="month" placeholder="En cours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optionnelle)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Détails sur votre formation"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
