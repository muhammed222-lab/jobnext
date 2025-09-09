import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    fullName: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    isAdmin: v.boolean(),
    createdAt: v.number(),
  }).index("email", ["email"]),
  
  jobs: defineTable({
    title: v.string(),
    description: v.string(),
    location: v.string(),
    salaryRange: v.string(),
    imageUrl: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    applicationFormId: v.optional(v.id("applicationForms")), // Link to custom form
    type: v.optional(v.string()),
    workMode: v.optional(v.string()),
    remote: v.optional(v.boolean()),
    urgent: v.optional(v.boolean()),
    requirements: v.optional(v.string()),
    benefits: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
  }),
  
  applications: defineTable({
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
    createdAt: v.number(),
    formData: v.optional(v.any()), // Store custom form submission data
  }).index("userId", ["userId"]).index("jobId", ["jobId"]),
  
  messages: defineTable({
    jobId: v.string(),
    senderId: v.string(),
    receiverId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }),
  
  // Custom application forms
  applicationForms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    jobId: v.optional(v.id("jobs")), // Optional link to specific job
    isDefault: v.boolean(), // Whether this is the default form
    createdAt: v.number(),
    createdBy: v.id("users"),
  }).index("jobId", ["jobId"]),
  
  // Form fields configuration
  formFields: defineTable({
    formId: v.id("applicationForms"),
    fieldType: v.union(
      v.literal("text"),
      v.literal("email"),
      v.literal("phone"),
      v.literal("textarea"),
      v.literal("select"),
      v.literal("checkbox"),
      v.literal("radio"),
      v.literal("file"),
      v.literal("number"),
      v.literal("date")
    ),
    label: v.string(),
    name: v.string(),
    required: v.boolean(),
    placeholder: v.optional(v.string()),
    options: v.optional(v.array(v.string())), // For select, radio, checkbox
    validation: v.optional(v.string()), // Custom validation regex
    order: v.number(), // Display order
    createdAt: v.number(),
  }).index("formId", ["formId"]),

  // Application files (for form submissions)
  applicationFiles: defineTable({
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    applicationId: v.id("applications"),
    fieldName: v.string(),
    uploadedAt: v.number(),
  }).index("applicationId", ["applicationId"]).index("fieldName", ["fieldName"]),
});

