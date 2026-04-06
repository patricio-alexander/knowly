import { supabase } from "@/lib/supabase";

export const addSubject = async (
  name: string,
  color: string,
  userId: string | undefined,
) => {
  return await supabase
    .from("subjects")
    .insert({ name, user_id: userId, color });
};

export const getSubjects = async (userId: string | undefined) => {
  return await supabase
    .from("subjects")
    .select("id, name, color, modules(count)")
    .eq("user_id", userId);
};
