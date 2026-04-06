import { supabase } from "@/lib/supabase";

export const getModules = async (subjecId: number) => {
  return await supabase
    .from("modules")
    .select("id, name")
    .eq("subject_id", subjecId);
};

export const addModule = async (name: string, subjectId: number) =>
  await supabase.from("modules").insert({ name, subject_id: subjectId });

export const deleteModule = async (moduleId: number) =>
  await supabase.from("modules").delete().eq("id", moduleId);
