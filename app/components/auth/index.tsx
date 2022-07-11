import { useSubmit } from "@remix-run/react";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const LoginButton = ({ firebaseConfig }: any) => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);

  const submit = useSubmit();

  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(
      (result) => {
        const user = result.user;
        user.getIdToken().then((token: string) => {
          submit({ token }, { method: "post" });
        });
      },
      () => {
        throw new Error("Something went wrong!");
      }
    );
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export const LogoutButton = ({ firebaseConfig }: any) => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);

  const submit = useSubmit();

  const handleLogout = () => {
    auth.signOut();
    submit(null, { action: "/logout", method: "post" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};
