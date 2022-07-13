import { useSubmit } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { LogoutButton } from "../auth";
import ThemeSwitcher from "./theme-switcher";
import ViewSwitcher from "./view-switcher";

const Navbar = ({
  user,
  firebaseClientConfig,
  activeFilter,
  viewMode,
  toggleViewMode,
}: any) => {
  const submit = useSubmit();
  return (
    <div className="navbar rounded-lg bg-base-200 shadow-lg">
      <ul className="menu menu-horizontal">
        <li className={`${activeFilter === "Idea" ? "bordered" : ""}`}>
          <a onClick={() => submit({ filter: "Idea" })}>Idea</a>
        </li>
        <li className={`${activeFilter === "In Progress" ? "bordered" : ""}`}>
          <a onClick={() => submit({ filter: "In Progress" })}>In Progress</a>
        </li>
        <li className={`${activeFilter === "Launched" ? "bordered" : ""}`}>
          <a onClick={() => submit({ filter: "Launched" })}>Launched</a>
        </li>
      </ul>
      <div className="ml-auto">
        <ul className="menu menu-horizontal p-0 gap-1">
          <li className="hidden md:flex">
            <ClientOnly fallback={<></>}>
              {() => <ViewSwitcher toggle={toggleViewMode} />}
            </ClientOnly>
          </li>
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
