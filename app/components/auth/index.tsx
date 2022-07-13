import { useSubmit } from "@remix-run/react";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const LoginButton = ({ firebaseConfig }: any) => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  // TODO error handling / web-api-key missing
  const auth = getAuth(app);

  const submit = useSubmit();

  const handleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider()).then(
      (result: any) => {
        const user = result.user;
        user.getIdToken(true).then((token: string) => {
          submit({ token }, { action: "/auth/login", method: "post" });
        });
      },
      (error: any) => {
        // TODO error handling / auth domain missing
        throw new Error(error);
      }
    );
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export const LogoutButton = ({ firebaseConfig }: any) => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);

  const submit = useSubmit();

  const handleLogout = async () => {
    await auth.signOut();
    submit(null, { action: "/auth/logout", method: "post" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};
