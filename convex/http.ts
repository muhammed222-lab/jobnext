import { httpRouter } from "convex/server";
import { getFileUrl } from "./fileUpload";

const http = httpRouter();

http.route({
  path: "/get-file-url",
  method: "GET",
  handler: getFileUrl,
});

export default http;