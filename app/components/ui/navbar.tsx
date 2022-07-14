import { Link } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { LoginButton, LogoutButton } from "../auth";
import ThemeSwitcher from "./theme-switcher";

const Navbar = ({
  user,
  firebaseClientConfig,
}: {
  // TODO: update user
  user: any;
  firebaseClientConfig: any;
}) => {
  return (
    <div className="navbar bg-base-100 shadow-md px-2 md:mb-3 md:rounded-lg">
      <Link to="/roadmap">
        <div className="flex flex-col justify-start select-none rounded-lg px-4 py-1">
          <span className="text-2xl font-bold">Roadmap</span>
          <span className="text-xs">Powered by Rowy</span>
        </div>
      </Link>
      <div className="ml-auto">
        {user === null ? (
          <LoginButton firebaseConfig={firebaseClientConfig} />
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost hover:bg-base-200 focus:bg-base-200 rounded-btn gap-2"
            >
              <div className="hidden md:block">{user.name}</div>
              <div className="block sm:hidden">{user.name.slice(0, 6)}...</div>
              <div className="h-9 overflow-hidden rounded-full ring ring-primary ring-offset-base-100">
                {/* TODO solve user data consistency */}
                <img
                  className="h-full"
                  src={`${user.picture ?? user.photoURL}`}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content shadow bg-base-200 mt-1"
            >
              <li>
                <label className="gap-0 justify-between">
                  <div>Switch theme:</div>
                  <ClientOnly fallback={<></>}>
                    {() => <ThemeSwitcher />}
                  </ClientOnly>
                </label>
              </li>
              <li>
                <LogoutButton firebaseConfig={firebaseClientConfig} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
