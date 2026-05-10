import { createClient } from "tinacms/dist/client";
import { queries } from "./types.ts";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'fe714f03d8cdabef2fa4e128a97ae2d922d03d5f ', queries,  });
export default client;
  