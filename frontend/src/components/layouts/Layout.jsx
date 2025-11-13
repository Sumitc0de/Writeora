import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            {/* <footer className="bg-[#130F0B] text-center py-4 text-sm text-gray-600">
                © {new Date().getFullYear()} Writeora. All rights reserved.
            </footer> */}

            <Footer/>
        </div>
    );
}

export default Layout;
