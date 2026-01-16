import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer";

function Layout() {
  const location = useLocation();

  // Add any paths where you want to hide the footer
  const hideFooterPaths = ["/profile"];
  // const hideHeaderPaths = ["/settings"]
  const hideFooter = hideFooterPaths.some(
    (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );


  // const hideHeader = hideHeaderPaths.some(
  //   (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  // );
  return (
    <div className="min-h-screen flex flex-col">
      <Header/> 
      <main className="flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;