import { Outlet } from "react-router-dom";
import NavbarFs from "../NavbarFs";
export default function WithNavBar({ children, setLogged }) {
  return (
    <>
      <div className="md:w-2/3 w-100">
        <NavbarFs setLogged={setLogged} />
        {children}
      </div>
      <Outlet />
    </>
  );
}
