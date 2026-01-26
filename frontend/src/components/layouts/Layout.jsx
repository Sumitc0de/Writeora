import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer";
import CursorSpotlight from "../CursorSpotlight";

function Layout() {
  const location = useLocation();

  // Add any paths where you want to hide the footer
  const hideFooterPaths = ["/profile"];
  // const hideHeaderPaths = ["/settings"]
  const hideFooter = hideFooterPaths.some(
    (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );


  //   (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  // );
  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <CursorSpotlight />
      <Header />
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;