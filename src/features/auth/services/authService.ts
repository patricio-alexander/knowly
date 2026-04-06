import { supabase } from "@/lib/supabase";

export const authService = {
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  signUp: (email: string, password: string, username: string) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    }),
  signOut: () => supabase.auth.signOut(),

  getSession: () => supabase.auth.getSession(),
  changePassword: (userId: string, password: string) =>
    supabase.auth.admin.updateUserById(userId, { password }),
};
