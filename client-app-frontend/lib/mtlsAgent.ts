import https from "https";
import fs from "fs";

export const mtlsAgent = new https.Agent({
  cert: fs.readFileSync("../mtls/client.crt"),
  key: fs.readFileSync("../mtls/client.key"),
  ca: fs.readFileSync("../mtls/ca.crt"),
});
