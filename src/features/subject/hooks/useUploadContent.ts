import { useAuth } from "@/context/AuthContext";
import {
  addAudio,
  uploadAudios,
  uploadImages,
  uploadPDFs,
} from "../services/uploads";
import { useState } from "react";

export const useUploadContent = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [isLoading, setIsLoading] = useState(false);

  const uploadAudio = async (name: string, uri: string) => {
    setIsLoading(true);
    const uploaded = await uploadAudios(name, uri, userId);
    if (uploaded.error) {
      throw new Error(uploaded.error.message);
    }

    const addedAudio = await addAudio(uploaded?.data?.fullPath, userId);

    if (addedAudio.error) {
      throw new Error(addedAudio.error.message);
    }
    setIsLoading(false);
  };

  const uploadImage = async (name: string, uri: string) => {
    setIsLoading(true);
    const uploaded = await uploadImages(name, uri, userId);
    if (uploaded.error) {
      throw new Error(uploaded.error.message);
    }

    setIsLoading(false);
  };

  const uploadPDF = async (name: string, uri: string) => {
    setIsLoading(true);
    const uploaded = await uploadPDFs(name, uri, userId);

    if (uploaded.error) {
      throw new Error(uploaded.error.message);
    }
    setIsLoading(false);
  };

  return { uploadAudio, uploadPDF, uploadImage, isLoading };
};
