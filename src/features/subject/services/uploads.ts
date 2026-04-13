import { supabase } from "@/lib/supabase";

import { File } from "expo-file-system";

export const uploadAudios = async (
  name: string,
  uri: string,
  userId: string | undefined,
) => {
  const file = new File(uri);
  const arrayBuffer = await file.arrayBuffer();

  return await supabase.storage
    .from("audios")
    .upload(`${userId}/${name}`, arrayBuffer);
};

export const uploadPDFs = async (
  name: string,
  uri: string,
  userId: string | undefined,
) => {
  const file = new File(uri);
  const arrayBuffer = await file.arrayBuffer();

  return await supabase.storage
    .from("documents")
    .upload(`${userId}/${name}`, arrayBuffer, {
      contentType: "application/pdf",
    });
};

export const uploadImages = async (
  name: string,
  uri: string,
  userId: string | undefined,
) => {
  const file = new File(uri);
  const arrayBuffer = await file.arrayBuffer();

  return await supabase.storage
    .from("images")
    .upload(`${userId}/${name}`, arrayBuffer, {
      contentType: "image/jpeg",
    });
};

export const addAudio = async (path: string, userId: string | undefined) => {
  const { data } = await supabase
    .from("uploads")
    .insert({ type: "audio", user_id: userId })
    .select("id")
    .single();

  return await supabase
    .from("files")
    .insert({ url: path, upload_id: data?.id });
};

export const addPDF = async (path: string, userId: string | undefined) => {
  const { data } = await supabase
    .from("uploads")
    .insert({ type: "audio", user_id: userId })
    .select("id")
    .single();

  return await supabase
    .from("files")
    .insert({ url: path, upload_id: data?.id });
};
