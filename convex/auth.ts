import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

// Helper: hash password using Web Crypto API (SHA-256 + salt)
async function hashPassword(password: string, salt?: string): Promise<string> {
  const encoder = new TextEncoder();
  const saltToUse = salt || crypto.getRandomValues(new Uint8Array(16)).join("");
  const data = encoder.encode(password + saltToUse);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${saltToUse}$${hashHex}`;
}

// Helper: verify password
async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, hash] = stored.split("$");
  const hashToCheck = await hashPassword(password, salt);
  return hashToCheck === stored;
}

export const signup = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    password: v.string(),
    isAdmin: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
    if (existing) throw new Error("Email already registered");
    const passwordHash = await hashPassword(args.password);
    const user = await ctx.db.insert("users", {
      fullName: args.fullName,
      email: args.email,
      passwordHash,
      isAdmin: args.isAdmin ?? false,
      createdAt: Date.now(),
    });
    return user;
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
    if (!user) throw new Error("Invalid credentials");
    const valid = await verifyPassword(args.password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  },
});
