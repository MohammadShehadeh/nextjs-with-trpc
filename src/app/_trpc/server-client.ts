import { createCaller } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
