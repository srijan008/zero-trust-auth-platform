import https from "https";
import fs from "fs";
import app from "./app.js";

https.createServer(
  {
    key: fs.readFileSync("../mtls/auth-server.key"),
    cert: fs.readFileSync("../mtls/auth-server.crt"),
    // ca: fs.readFileSync("../mtls/ca.crt"),
    // requestCert: true,
    // rejectUnauthorized: true, // 🔥 mTLS enforced
  },
  app
).listen(4000, () => {
  console.log("Auth server running with mTLS on https://localhost:4000");
});



// 2️⃣ Private mTLS server (BACKEND ONLY)
// 📄 auth-server/mtls-server.js
// import https from "https";
// import fs from "fs";
// import app from "./app.js";

// https.createServer(
//   {
//     key: fs.readFileSync("../mtls/auth-server.key"),
//     cert: fs.readFileSync("../mtls/auth-server.crt"),
//     ca: fs.readFileSync("../mtls/ca.crt"),
//     requestCert: true,
//     rejectUnauthorized: true,
//   },
//   app
// ).listen(4443, () => {
//   console.log("mTLS auth server running on https://localhost:4443");
// });


// Used by:

// /token

// /refresh