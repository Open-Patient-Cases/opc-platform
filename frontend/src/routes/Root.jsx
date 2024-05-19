import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <div>
        <Header />
        <Toolbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
