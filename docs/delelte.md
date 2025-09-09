Deleting Files

Files stored in Convex can be deleted from mutations, actions, and HTTP actions via the storage.delete() function, which accepts a storage ID.

Storage IDs correspond to documents in the "_storage" system table (see Metadata), so they can be validated using the v.id("_storage").
convex/images.ts
TS

import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export const deleteById = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});

