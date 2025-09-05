import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useCurrentUser(email?: string) {
  // You can pass the email from localStorage, context, or props
  return useQuery(api.users.getByEmail, email ? { email } : "skip");
}
