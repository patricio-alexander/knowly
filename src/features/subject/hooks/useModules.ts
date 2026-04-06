import { useQuery } from "@tanstack/react-query";
import { getModules } from "../services/modules";

export const useModules = (subjectId: number) => {
  return useQuery({
    queryKey: ["modules", subjectId],
    queryFn: async () => {
      const { data, error } = await getModules(subjectId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!subjectId,
  });
};
