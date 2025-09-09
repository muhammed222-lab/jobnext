import {
  queryGeneric as query,
  mutationGeneric as mutation,
  internalMutationGeneric as internalMutation
} from "convex/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Helper function to check if user is admin
async function isAdmin(ctx: any, userId: string) {
  const user = await ctx.db.get(userId as any);
  return user?.isAdmin || false;
}

// Get all users (admin only)
export const getAllUsers = query({
  args: { adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access this data");
    }
    return await ctx.db.query("users").collect();
  },
});

// Get all applications (admin only)
export const getAllApplications = query({
  args: { adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access this data");
    }
    return await ctx.db.query("applications").collect();
  },
});

// Get application details (admin only)
export const getApplicationDetails = query({
  args: { applicationId: v.id("applications"), adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access this data");
    }
    
    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }
    
    const fileUrls: { [key: string]: string | null } = {};
    const newFormData: { [key: string]: any } = {};

    if (application.formData) {
      for (const key in application.formData) {
        const value = application.formData[key];
        let isFile = false;
        if (typeof value === 'string') {
          try {
            const url = await ctx.storage.getUrl(value as any);
            if (url) {
              fileUrls[key] = url;
              isFile = true;
            }
          } catch (e) {
            // Not a file ID, do nothing
          }
        }
        if (!isFile) {
          newFormData[key] = value;
        }
      }
    }
    
    // Also handle resumeUrl if it's a storageId
    if (application.resumeUrl) {
      try {
        const url = await ctx.storage.getUrl(application.resumeUrl as any);
        if (url) {
          fileUrls['resumeUrl'] = url;
        }
      } catch (e) {
        // Not a file ID, do nothing
      }
    }

    return {
      ...application,
      formData: newFormData,
      fileUrls,
    };
  },
});

// Delete application (admin only)
export const deleteApplication = mutation({
  args: { applicationId: v.id("applications"), adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can delete applications");
    }
    return await ctx.db.delete(args.applicationId);
  },
});

// Get applications by job ID (admin only)
export const getApplicationsByJob = query({
  args: { jobId: v.string(), adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access this data");
    }
    return await ctx.db
      .query("applications")
      .withIndex("jobId", (q) => q.eq("jobId", args.jobId))
      .collect();
  },
});

// Create application form (admin only)
export const createApplicationForm = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    jobId: v.optional(v.id("jobs")),
    isDefault: v.boolean(),
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can create forms");
    }

    const formId = await ctx.db.insert("applicationForms", {
      title: args.title,
      description: args.description,
      jobId: args.jobId,
      isDefault: args.isDefault,
      createdAt: Date.now(),
      createdBy: args.adminUserId as any,
    });

    // If this is set as default, remove default flag from other forms
    if (args.isDefault) {
      const existingDefaultForms = await ctx.db
        .query("applicationForms")
        .filter((q) => q.eq(q.field("isDefault"), true))
        .collect();
      
      for (const form of existingDefaultForms) {
        if (form._id !== formId) {
          await ctx.db.patch(form._id, { isDefault: false });
        }
      }
    }

    return formId;
  },
});

// Add field to application form (admin only)
export const addFormField = mutation({
  args: {
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
    options: v.optional(v.array(v.string())),
    validation: v.optional(v.string()),
    order: v.number(),
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can add form fields");
    }

    return await ctx.db.insert("formFields", {
      formId: args.formId,
      fieldType: args.fieldType,
      label: args.label,
      name: args.name,
      required: args.required,
      placeholder: args.placeholder,
      options: args.options,
      validation: args.validation,
      order: args.order,
      createdAt: Date.now(),
    });
  },
});

// Get all application forms (admin only)
export const getAllApplicationForms = query({
  args: { adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access forms");
    }
    return await ctx.db.query("applicationForms").collect();
  },
});

// Get application forms for selection (admin only)
export const getApplicationFormsForSelection = query({
  args: { adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access forms");
    }
    const forms = await ctx.db.query("applicationForms").collect();
    return forms.map(form => ({
      _id: form._id,
      title: form.title,
      isDefault: form.isDefault
    }));
  },
});

// Get form fields for a specific form
export const getFormFields = query({
  args: { formId: v.id("applicationForms") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("formFields")
      .withIndex("formId", (q) => q.eq("formId", args.formId))
      .order("asc")
      .collect();
  },
});

// Get all form fields (admin only)
export const getAllFormFields = query({
  args: { adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can access all form fields");
    }
    return await ctx.db.query("formFields").collect();
  },
});

// Get default application form
export const getDefaultApplicationForm = query({
  args: {},
  handler: async (ctx) => {
    const defaultForm = await ctx.db
      .query("applicationForms")
      .filter((q) => q.eq(q.field("isDefault"), true))
      .first();
    return defaultForm;
  },
});

// Update application with custom form data
export const updateApplicationWithFormData = mutation({
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

// Delete user (admin only)
export const deleteUser = mutation({
  args: { userId: v.id("users"), adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can delete users");
    }
    return await ctx.db.delete(args.userId);
  },
});

// Toggle user admin status (admin only)
export const toggleUserAdmin = mutation({
  args: { userId: v.id("users"), adminUserId: v.string() },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can modify user roles");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.patch(args.userId, {
      isAdmin: !user.isAdmin,
    });
  },
});

// Update application form (admin only)
export const updateApplicationForm = mutation({
  args: {
    formId: v.id("applicationForms"),
    adminUserId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    isDefault: v.boolean(),
    fields: v.array(
      v.object({
        fieldType: v.string(),
        label: v.string(),
        name: v.string(),
        required: v.boolean(),
        placeholder: v.optional(v.string()),
        options: v.optional(v.array(v.string())),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx, args.adminUserId);
    if (!isUserAdmin) {
      throw new Error("Only admin users can update forms");
    }

    // 1. Update the form details
    await ctx.db.patch(args.formId, {
      title: args.title,
      description: args.description,
      isDefault: args.isDefault,
    });

    // If this form is set to default, ensure no others are
    if (args.isDefault) {
      const existingDefaultForms = await ctx.db
        .query("applicationForms")
        .filter((q) => q.eq(q.field("isDefault"), true))
        .collect();
      
      for (const form of existingDefaultForms) {
        if (form._id !== args.formId) {
          await ctx.db.patch(form._id, { isDefault: false });
        }
      }
    }

    // 2. Get all existing fields for the form
    const existingFields = await ctx.db
      .query("formFields")
      .withIndex("formId", (q) => q.eq("formId", args.formId))
      .collect();

    // 3. Delete all existing fields
    for (const field of existingFields) {
      await ctx.db.delete(field._id);
    }

    // 4. Insert the new fields
    for (const field of args.fields) {
      await ctx.db.insert("formFields", {
        formId: args.formId,
        fieldType: field.fieldType as any,
        label: field.label,
        name: field.name,
        required: field.required,
        placeholder: field.placeholder,
        options: field.options,
        order: field.order,
        createdAt: Date.now(),
      });
    }

    return { success: true };
  },
});
