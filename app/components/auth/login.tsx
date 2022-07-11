import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const Login = ({ firebaseConfig }: any) => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          throw new Error("User credentials cannot be null");
        }
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        setToken(token);
      })
      .catch((error: any) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      {!user && <button onClick={handleLogin}>Sign in with Google</button>}
      {user && <button onClick={handleLogout}>Logout</button>}
      {user ? <div>{JSON.stringify(user)}</div> : "no user"}
      {token ? <div>{JSON.stringify(token)}</div> : "no token"}
      <div>{JSON.stringify(firebaseConfig)}</div>
    </>
  );
};

export default Login;
