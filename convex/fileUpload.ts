import { httpAction, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadFile = httpAction(async (ctx, request) => {
  // Check if user is authenticated (you might want to add proper auth)
  const formData = await request.formData();
  const file = formData.get("file") as File;
  
  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  // Store file in Convex storage (Convex handles Blob types directly)
  const storageId = await ctx.storage.store(file);

  // Return the storage ID that can be used to generate a URL
  return new Response(JSON.stringify({ storageId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// HTTP endpoint to get file URL - call this from the frontend: /api/get-file-url?storageId=abc123
export const getFileUrl = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const storageId = url.searchParams.get("storageId");
  
  if (!storageId) {
    return new Response("Storage ID required", { status: 400 });
  }

  const fileUrl = await ctx.storage.getUrl(storageId);
  if (!fileUrl) {
    return new Response("File not found", { status: 404 });
  }
  
  return new Response(JSON.stringify({ url: fileUrl }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    },
  });
});

// Add OPTIONS handler for CORS
export const options = httpAction(async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
});

// Generate upload URL for application files (public access)
export const generateApplicationUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Store application file reference
export const storeApplicationFile = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    applicationId: v.id("applications"),
    fieldName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("applicationFiles", {
      storageId: args.storageId,
      fileName: args.fileName,
      fileType: args.fileType,
      fileSize: args.fileSize,
      applicationId: args.applicationId,
      fieldName: args.fieldName,
      uploadedAt: Date.now(),
    });
  },
});

// Get application files for a specific application
export const getApplicationFiles = query({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applicationFiles")
      .withIndex("applicationId", (q) => q.eq("applicationId", args.applicationId))
      .collect();
  },
});

// Get file URL from storage ID
export const getStorageFileUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const fileUrl = await ctx.storage.getUrl(args.storageId);
    return fileUrl;
  },
});

// Generate admin upload URL (requires authentication)
export const generateAdminUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Add authentication logic here if needed
    return await ctx.storage.generateUploadUrl();
  },
});