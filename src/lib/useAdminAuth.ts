import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "./useCurrentUser";

export function useAdminAuth() {
  // Get current user from localStorage or context
  const getCurrentUserEmail = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail');
    }
    return null;
  };

  const userEmail = getCurrentUserEmail();
  const currentUser = useCurrentUser(userEmail || undefined);

  const isAdmin = currentUser?.isAdmin || false;
  const isLoading = currentUser === undefined;

  return {
    isAdmin,
    isLoading,
    currentUser,
  };
}

export function useAdminOnly() {
  const { isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return { allowed: false, loading: true };
  }

  if (!isAdmin) {
    return { allowed: false, loading: false };
  }

  return { allowed: true, loading: false };
}