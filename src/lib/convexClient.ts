import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_DEPLOYMENT_URL;
export const convex = new ConvexReactClient(convexUrl);

export { ConvexProvider };
