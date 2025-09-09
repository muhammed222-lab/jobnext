import {
  queryGeneric as query,
  mutationGeneric as mutation,
} from "convex/server";
import { v } from "convex/values";

export const listByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    jobId: v.string(),
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    resumeUrl: v.optional(v.string()),
    coverLetter: v.optional(v.string()),
    skills: v.optional(v.string()),
    salary: v.optional(v.string()),
    availability: v.optional(v.string()),
    formData: v.optional(v.any()), // For custom form submissions
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("applications", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Update application with custom form data
export const updateWithFormData = mutation({
  args: {
    applicationId: v.id("applications"),
    formData: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.applicationId, {
      formData: args.formData,
    });
  },
});
