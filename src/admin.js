import { initializeApp, applicationDefault } from "firebase-admin/app";

// const serviceAccount = {
//   type: import.meta.env.VITE_SOME_TYPE,
//   project_id: import.meta.env.VITE_SOME_PROJECT_ID,
//   private_key_id: import.meta.env.VITE_SOME_PRIVATE_KEY_ID,
//   private_key: import.meta.env.VITE_SOME_PRIVATE_KEY,
//   client_email: import.meta.env.VITE_SOME_CLIENT_EMAIL,
//   client_id: import.meta.env.VITE_SOME_CLIENT_ID,
//   auth_uri: import.meta.env.VITE_SOME_AUTH_URI,
//   token_uri: import.meta.env.VITE_SOME_TOKEN_URI,
//   auth_provider_x509_cert_url: import.meta.env
//     .VITE_SOME_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: import.meta.env.VITE_SOME_CLIENT_X509_CERT_URL,
// };

initializeApp({
  credential: applicationDefault(),
  databaseURL:
    "https://ra-project2-blog-app-default-rtdb.asia-southeast1.firebasedatabase.app",
});
