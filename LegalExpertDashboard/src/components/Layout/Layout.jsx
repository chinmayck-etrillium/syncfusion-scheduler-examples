import LegalExpertNavbar from "../LegalExpertNavbar/LegalExpertNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <LegalExpertNavbar />
      <Outlet />
    </>
  );
}
