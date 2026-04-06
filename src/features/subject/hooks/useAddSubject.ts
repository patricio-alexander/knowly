import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubject } from "../services/subjects";
import { Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";

export const useAddSubject = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();

  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const { error } = await addSubject(name, color, userId);
      if (error) {
        throw new Error(error.message);
      }
    },

    onError: () => {
      return Alert.alert(
        "Error",
        "No se pudo agregar la materia. Intenta de nuevo.",
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects", userId] });
    },
  });
};
