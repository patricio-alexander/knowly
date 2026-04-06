import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";

export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { error, data } = await getProfile(userId);
      if (error) throw new Error(error.message);

      if (!data) throw new Error("Perfil no encontrado");

      return data;
    },
    enabled: !!userId,
  });
};
