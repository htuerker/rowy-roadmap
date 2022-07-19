export const checkEnvironmentVariables = () => {
  if (!process.env.CLIENT_FIREBASE_PROJECT_ID) {
    return new Error("CLIENT_FIREBASE_PROJECT_ID");
  }
  if (!process.env.CLIENT_FIREBASE_PROJECT_WEB_API_KEY) {
    return new Error("CLIENT_FIREBASE_PROJECT_WEB_API_KEY");
  }
  if (!process.env.CLIENT_FIREBASE_AUTH_DOMAIN) {
    return new Error("CLIENT_FIREBASE_AUTH_DOMAIN");
  }
  if (!process.env.SERVER_FIREBASE_SERVICE_ACCOUNT) {
    return new Error("SERVER_FIREBASE_SERVICE_ACCOUNT");
  }
  if (!process.env.SESSION_SECRET) {
    return new Error("SESSION_SECRET");
  }
};
