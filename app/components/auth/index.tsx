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
  authDomain: "rowy-deploy-2.firebaseapp.com",
  projectId: "rowy-deploy-2",
  storageBucket: "rowy-deploy-2.appspot.com",
  messagingSenderId: "520562993841",
  appId: "1:520562993841:web:730dd98844c3f0f4199090",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log(user);
});
export const Login = () => {
  const submit = useSubmit();

  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(
      (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          throw new Error("Something went wrong!");
        }
        const user = result.user;
        user.getIdToken().then(
          (token: string) => {
            submit({ token }, { method: "post" });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        throw new Error("Something went wrong!");
      }
    );
  };

  return <button onClick={handleLogin}>Login</button>;
};

export const Logout = () => {
  const submit = useSubmit();

  const handleLogout = () => {
    auth.signOut();
    submit(null, { action: "/logout", method: "post" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};
