import { ClientOnly } from "remix-utils";
import { LogoutButton } from "../auth";
import ThemeSwitcher from "./theme-switcher";

const Navbar = ({ user, firebaseClientConfig, toggleViewMode }: any) => {
  return (
    <div className="navbar rounded-lg bg-base-200 shadow-lg px-2 mb-3">
      <div className="ml-auto">
        <ul className="menu menu-horizontal p-0 gap-1">
          <li className="hidden md:flex ">
            <ClientOnly fallback={<></>}>{() => <ThemeSwitcher />}</ClientOnly>
          </li>
          <li tabIndex={0}>
            <div tabIndex={0} className="btn btn-ghost normal-case py-1.5 px-3">
              <div className="hidden md:block">{user.name}</div>
              <div className="h-full overflow-hidden rounded-full ring ring-primary ring-offset-base-100">
                <img className="h-full" src={`${user.picture}`} alt="profile" />
              </div>
            </div>
            <ul className="bg-base-100">
              <li>
                <LogoutButton firebaseConfig={firebaseClientConfig} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
