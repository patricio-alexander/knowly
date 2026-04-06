import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../services/subjects";
import { Subject } from "../components/SubjectList";
import { useAuth } from "@/context/AuthContext";

export const useSubjects = () => {
  const { session } = useAuth();

  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["subjects", userId],
    queryFn: async (): Promise<Subject[]> => {
      const { data, error } = await getSubjects(userId);

      if (error) {
        throw new Error("Error al obtener las materias");
      }

      return data.map((subject) => ({
        id: subject.id,
        name: subject.name,
        modulesCount: subject.modules[0].count ?? 0,
        color: subject.color,
      }));
    },

    enabled: !!userId,
  });
};
