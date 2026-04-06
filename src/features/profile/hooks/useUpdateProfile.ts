import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/profile";
import { Alert } from "react-native";

export const useUpdateProfile = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      speciality,
    }: {
      username: string;
      speciality: string;
    }) => {
      const { error } = await updateProfile(username, speciality, userId);

      if (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
    onError: () => {
      return Alert.alert(
        "Error",
        "No se pudo actualizar tu perfil. Intenta de nuevo.",
      );
    },
  });
};
