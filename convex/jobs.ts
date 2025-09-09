import {
  queryGeneric as query,
  mutationGeneric as mutation,
} from "convex/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("jobs").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    location: v.string(),
    salaryRange: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdBy: v.string(),
    type: v.optional(v.string()),
    workMode: v.optional(v.string()),
    remote: v.optional(v.boolean()),
    urgent: v.optional(v.boolean()),
    requirements: v.optional(v.string()),
    benefits: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    applicationFormId: v.id("applicationForms"),
  },
  handler: async (ctx, args) => {
    // Check if user is admin/employer
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.createdBy))
      .first();
    if (!user || !user.isAdmin) {
      throw new Error("Only admin users can post jobs");
    }
    return await ctx.db.insert("jobs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const get = query({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.jobId);
  },
});

export const update = mutation({
  args: {
    jobId: v.id("jobs"),
    title: v.string(),
    description: v.string(),
    location: v.string(),
    salaryRange: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdBy: v.string(),
    type: v.optional(v.string()),
    workMode: v.optional(v.string()),
    remote: v.optional(v.boolean()),
    urgent: v.optional(v.boolean()),
    requirements: v.optional(v.string()),
    benefits: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    applicationFormId: v.id("applicationForms"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.jobId, {
      title: args.title,
      description: args.description,
      location: args.location,
      salaryRange: args.salaryRange,
      imageUrl: args.imageUrl,
      type: args.type,
      workMode: args.workMode,
      remote: args.remote,
      urgent: args.urgent,
      requirements: args.requirements,
      benefits: args.benefits,
      skills: args.skills,
      applicationFormId: args.applicationFormId,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
