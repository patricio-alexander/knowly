import { useMutation } from "@tanstack/react-query";
import { deleteModule } from "../services/modules";
import { Alert } from "react-native";

export const useDeleteModule = () => {
  return useMutation({
    mutationFn: async (moduleId: number) => {
      const { error } = await deleteModule(moduleId);
      if (error) {
        throw new Error(error.message);
      }
    },

    onError: () => {
      Alert.alert("Error", "No se pudo eliminar el módulo. Intenta de nuevo");
    },
  });
};

