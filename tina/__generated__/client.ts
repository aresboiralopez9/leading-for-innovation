import { createClient } from "tinacms/dist/client";
import { queries } from "./types.ts";
export const client = createClient({ cacheDir: 'C:/Users/18955802/Documents/authority-blog/tina/__generated__/.cache/1778441613338', url: 'http://localhost:4001/graphql', token: 'bdeac105dd94aefd0fee772481981f84d357e630', queries,  });
export default client;
  