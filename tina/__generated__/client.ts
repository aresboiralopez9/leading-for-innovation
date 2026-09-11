import { createClient } from "tinacms/dist/client";
import { queries } from "./types.ts";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '3d2cdd6dbd840b6b92ffb0ea6e864e7e63dac7aa', queries,  });
export default client;
  