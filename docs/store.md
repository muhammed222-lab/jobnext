Storing Generated Files

Files can be uploaded to Convex from a client and stored directly, see Upload.

Alternatively files can also be stored after they've been fetched or generated in actions and HTTP actions. For example you might call a third-party API to generate an image based on a user prompt and then store that image in Convex.

Example: Dall-E Storage & Action
Storing files in actions

Storing files in actions is similar to uploading a file via an HTTP action.

The action takes these steps:

    Fetch or generate an image.
    Store the image using storage.store() and receive a storage ID.
    Save the storage ID into your data model via a mutation.

Storage IDs correspond to documents in the "_storage" system table (see Metadata), so they can be validated using the v.id("_storage") validator and typed as Id<"_storage"> in TypeScript.
convex/images.ts
TS

import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const generateAndStore = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    // Not shown: generate imageUrl from `prompt`
    const imageUrl = "https://....";

    // Download the image
    const response = await fetch(imageUrl);
    const image = await response.blob();

    // Store the image in Convex
    const storageId: Id<"_storage"> = await ctx.storage.store(image);

    // Write `storageId` to a document
    await ctx.runMutation(internal.images.storeResult, {
      storageId,
      prompt: args.prompt,
    });
  },
});

export const storeResult = internalMutation({
  args: {
    storageId: v.id("_storage"),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const { storageId, prompt } = args;
    await ctx.db.insert("images", { storageId, prompt });
  },
});