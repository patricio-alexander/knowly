import { authService } from "@/features/auth/services/authService";
import { AuthError, Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type AuthContextProps = {
  isLoading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, username: string, password: string) => void;
  signOut: () => Promise<{ success: boolean; error?: AuthError | null }>;
  changePassword: (userId: string, password: string) => void;
  //signInWithGoogle: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("usar useAuth dentro de AuthProvider");
  }

  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const signOut = async (): Promise<{ success: boolean; error?: any }> => {
    const { error } = await authService.signOut();

    if (error) {
      return { success: false, error };
    }

    setSession(null);
    return { success: true };
  };

  const signIn = async (email: string, password: string) => {
    const { data } = await authService.signIn(email, password);
    setSession(data.session);
    router.replace("/(tabs)");
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { data } = await authService.signUp(email, password, username);
    if (data) {
      Alert.alert(
        "¡Bienvenido!",
        "Tu cuenta ya está lista 🚀 Inicia sesión y empieza a usar la app.",
      );
    }
  };

  const changePassword = async (userId: string, password: string) => {
    const { error } = await authService.changePassword(userId, password);
    if (error) {
      return Alert.alert("Error", "Hubo error al intentar la contraseña");
    }

    Alert.alert("¡Listo!", "Tu contraseña se actualizó con éxito.");
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await authService.getSession();

      if (session) {
        setSession(session);
        setIsLoading(false);
      } else {
        setSession(null);
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, session, signIn, signUp, signOut, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
