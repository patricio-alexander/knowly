import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addModule } from "../services/modules";
import { Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";

export const useAddModule = (subjectId: number) => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const { error } = await addModule(name, subjectId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules", subjectId] });
      queryClient.invalidateQueries({
        queryKey: ["subjects", session?.user?.id],
      });
    },
    onError: () => {
      Alert.alert("Error", "No se pudo agregar el módulo. Intenta de nuevo");
    },
  });
};
