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

const experienceSchema = z.object({
  company: z.string().min(1, "L'entreprise est requise"),
  position: z.string().min(1, "Le poste est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional().default(""),
  description: z.string().min(10, "La description doit faire au moins 10 caractères"),
});

type ExperienceFormProps = {
  section: CVSection;
};

export function ExperienceForm({ section }: ExperienceFormProps) {
  const { updateSection } = useStore();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: section.content?.company || "",
      position: section.content?.position || "",
      startDate: section.content?.startDate || "",
      endDate: section.content?.endDate || "",
      description: section.content?.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof experienceSchema>) {
    updateSection(section.id, { content: values });
    toast.success("Expérience mise à jour");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'entreprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste</FormLabel>
              <FormControl>
                <Input placeholder="Titre du poste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez vos responsabilités et réalisations"
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