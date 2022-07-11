import { useSubmit } from "@remix-run/react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0d_6JWS7hcJOAkRxWfItN2TatX1eoTJI",
  projectId: "rowy-deploy-2",
  authDomain: "rowy-deploy-2.firebaseapp.com",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log(user);
});
export const LoginButton = () => {
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

  return <button onClick={handleLogin}>Login</button>;
};

export const LogoutButton = () => {
  const submit = useSubmit();

  const handleLogout = () => {
    auth.signOut();
    submit(null, { action: "/logout", method: "post" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};
