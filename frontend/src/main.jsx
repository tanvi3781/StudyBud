import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";

import App from "./App";
import "./assets/styles.css";

import { AuthProvider } from "./auth/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import Navbar from "./pages/Navbar";


function Layout() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideNavbar && <Navbar />}

            <App />
        </>
    );
}


ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>

        <AuthProvider>

            <MessageProvider>

                <Layout />

            </MessageProvider>

        </AuthProvider>

    </BrowserRouter>

);