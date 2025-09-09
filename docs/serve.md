Serving Files

Files stored in Convex can be served to your users by generating a URL pointing to a given file.
Generating file URLs in queries

The simplest way to serve files is to return URLs along with other data required by your app from queries and mutations.

A file URL can be generated from a storage ID by the storage.getUrl function of the QueryCtx, MutationCtx, or ActionCtx object:
convex/listMessages.ts
TS

import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").collect();
    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(message.format === "image"
          ? { url: await ctx.storage.getUrl(message.body) }
          : {}),
      })),
    );
  },
});

File URLs can be used in img elements to render images:
src/App.tsx
TS

function Image({ message }: { message: { url: string } }) {
  return <img src={message.url} height="300px" width="auto" />;
}

In your query you can control who gets access to a file when the URL is generated. If you need to control access when the file is served, you can define your own file serving HTTP actions instead.
Serving files from HTTP actions

You can serve files directly from HTTP actions. An HTTP action will need to take some parameter(s) that can be mapped to a storage ID, or a storage ID itself.

This enables access control at the time the file is served, such as when an image is displayed on a website. But note that the HTTP actions response size is currently limited to 20MB. For larger files you need to use file URLs as described above.

A file Blob object can be generated from a storage ID by the storage.get function of the ActionCtx object, which can be returned in a Response:
convex/http.ts
TS

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/getImage",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get("storageId")! as Id<"_storage">;
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("Image not found", {
        status: 404,
      });
    }
    return new Response(blob);
  }),
});

export default http;

The URL of such an action can be used directly in img elements to render images:
src/App.tsx
TS

const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

function Image({ storageId }: { storageId: string }) {
  // e.g. https://happy-animal-123.convex.site/getImage?storageId=456
  const getImageUrl = new URL(`${convexSiteUrl}/getImage`);
  getImageUrl.searchParams.set("storageId", storageId);

  return <img src={getImageUrl.href} height="300px" width="auto" />;
}