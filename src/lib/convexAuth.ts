import { useMutation } from "convex/react";
import { useCallback } from "react";
import { api } from "../../convex/_generated/api";

export function useConvexLogin() {
  const login = useMutation(api.auth.login);
  return useCallback(
    async (email: string, password: string) => {
      return await login({ email, password });
    },
    [login]
  );
}

export function useConvexSignup() {
  const signup = useMutation(api.auth.signup);
  return useCallback(
    async (
      fullName: string,
      email: string,
      password: string,
      isAdmin = false
    ) => {
      return await signup({ fullName, email, password, isAdmin });
    },
    [signup]
  );
}
