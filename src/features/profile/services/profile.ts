import { supabase } from "@/lib/supabase";

type Profile = {
  username: string;
  email: string;
  speciality: string;
  avatar_url: string;
};

export const updateProfile = async (
  username: string,
  speciality: string,
  id: string | undefined,
) =>
  await supabase.from("profiles").update({ username, speciality }).eq("id", id);

export const getProfile = async (id: string | undefined) => {
  return await supabase
    .from("profiles")
    .select("username, email, speciality, avatar_url")
    .eq("id", id)
    .single<Profile>();
};
