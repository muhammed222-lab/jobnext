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
    dob: v.string(),
    gender: v.string(),
    maritalStatus: v.string(),
    nationality: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    nextOfKin: v.string(),
    emergencyContact: v.string(),
    nationalId: v.string(),
    passport: v.string(),
    tin: v.string(),
    ssn: v.string(),
    workPermit: v.string(),
    jobTitle: v.string(),
    department: v.string(),
    employeeId: v.string(),
    joiningDate: v.string(),
    employmentType: v.string(),
    workLocation: v.string(),
    supervisor: v.string(),
    education: v.string(),
    certifications: v.string(),
    previousEmployment: v.string(),
    skills: v.string(),
    bankName: v.string(),
    bankAccount: v.string(),
    bankAccountName: v.string(),
    paymentMethod: v.string(),
    salary: v.string(),
    pensionAccount: v.string(),
    taxId: v.string(),
    pensionScheme: v.string(),
    healthInsurance: v.string(),
    otherContributions: v.string(),
    contractAccepted: v.boolean(),
    offerAccepted: v.boolean(),
    ndaAccepted: v.boolean(),
    handbookAccepted: v.boolean(),
    workTools: v.string(),
    resumeUrl: v.optional(v.string()),
    coverLetter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("applications", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
