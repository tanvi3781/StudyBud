import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { useMessage } from "../context/MessageContext";
import api from "../api/axios";


function Navbar() {

    const { user, logout } = useAuth();

    const { showMessage } = useMessage();

    const [dropdownOpen, setDropdownOpen] = useState(false);


    // ================= SEARCH =================

    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("q") || "";

    const [searchInput, setSearchInput] = useState(searchQuery);


    // Keep search box synchronized with URL
    useEffect(() => {

        setSearchInput(searchQuery);

    }, [searchQuery]);


    const handleSearch = (e) => {

        setSearchInput(e.target.value);

    };


    const handleSearchSubmit = (e) => {

        e.preventDefault();

        const value = searchInput.trim();

        if (value) {

            setSearchParams({ q: value });

        } else {

            setSearchParams({});

        }

    };


    // ================= LOGOUT =================

    const handleLogout = async () => {

        try {

            await api.post("/logout/");

        } catch (error) {

            console.log("Logout API error:", error);

        } finally {

            logout();

            setDropdownOpen(false);

            showMessage(
                "You have been logged out.",
                "success"
            );

        }
    };


    return (

        <header className={`header ${user ? "header--loggedIn" : ""}`}>

            <div className="container">


                {/* ================= LOGO ================= */}

                <Link
                    to="/"
                    className="header__logo"
                >

                    <h1>StudyBuddy</h1>

                </Link>



                {/* ================= SEARCH ================= */}

                <form
                    className="header__search"
                    onSubmit={handleSearchSubmit}
                >

                    <label>

                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >

                            <title>
                                search
                            </title>

                            <path
                                d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12S0 5.383 0 12s5.383 12 12 12c2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
                            />

                        </svg>


                        <input
                            name="q"
                            type="text"
                            placeholder="Search for rooms..."
                            value={searchInput}
                            onChange={handleSearch}
                        />

                    </label>

                </form>



                {/* ================= MENU ================= */}

                <nav className="header__menu">


                    {user ? (

                        <>

                            {/* ================= LOGGED IN ================= */}

                            <div className="header__user">


                                {/* USER AVATAR + NAME */}

                                <Link
                                    to={`/profile/${user.id}`}
                                >

                                    <div className="avatar avatar--medium active">

                                        <img
                                            src="https://randomuser.me/api/portraits/men/37.jpg"
                                            alt={user.username}
                                        />

                                    </div>


                                    <p>

                                        {user.username}

                                        <span>
                                            @{user.username}
                                        </span>

                                    </p>

                                </Link>



                                {/* ================= ARROW ================= */}

                                <button
                                    type="button"
                                    className="dropdown-button"
                                    onClick={() =>
                                        setDropdownOpen(
                                            (previous) => !previous
                                        )
                                    }
                                >

                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                    >

                                        <title>
                                            chevron-down
                                        </title>

                                        <path
                                            d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"
                                        />

                                    </svg>

                                </button>

                            </div>



                            {/* ================= DROPDOWN ================= */}

                            <div
                                className="dropdown-menu"
                                style={{
                                    display: dropdownOpen
                                        ? "block"
                                        : "none"
                                }}
                            >


                                {/* SETTINGS */}

                                <Link
                                    to={`/profile/${user.id}`}
                                    className="dropdown-link"
                                    onClick={() =>
                                        setDropdownOpen(false)
                                    }
                                >

                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                    >

                                        <title>
                                            tools
                                        </title>

                                        <path
                                            d="M27.465 32c-1.211 0-2.35-0.471-3.207-1.328l-9.392-9.391c-2.369 0.898-4.898 0.951-7.355 0.15-3.274-1.074-5.869-3.67-6.943-6.942-0.879-2.682-0.734-5.45 0.419-8.004 0.135-0.299 0.408-0.512 0.731-0.572 0.32-0.051 0.654 0.045 0.887 0.277l5.394 5.395 3.586-3.586-5.394-5.395c-0.232-0.232-0.336-0.564-0.276-0.887s0.272-0.596 0.572-0.732c2.552-1.152 5.318-1.295 8.001-0.418 3.274 1.074 5.869 3.67 6.943 6.942 0.806 2.457 0.752 4.987-0.15 7.358l9.392 9.391c0.844 0.842 1.328 2.012 1.328 3.207 0 2.5-2.034 4.535-4.535 4.535z"
                                        />

                                    </svg>

                                    Settings

                                </Link>



                                {/* LOGOUT */}

                                <a
                                    href="/login"
                                    className="dropdown-link"
                                    onClick={handleLogout}
                                >

                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                    >

                                        <title>
                                            sign-out
                                        </title>

                                        <path
                                            d="M3 0h22c0.553 0 1 0 1 0.553l0 3.447h-2v-2h-20v28h20v-2h2l0 3.447c0 0.553-0.447 1 0-1v-30c0-0.553-0.447-1 1-1z"
                                        />

                                        <path
                                            d="M21.879 21.293l1.414 1.414 6.707-6.707-6.707-6.707-1.414 1.414 4.293 4.293h-14.172v2h14.172l-4.293 4.293z"
                                        />

                                    </svg>

                                    Logout

                                </a>

                            </div>

                        </>

                    ) : (

                        /* ================= LOGGED OUT ================= */

                        <Link to="/login">

                            <img
                                src="/images/avatar.svg"
                                alt="Login"
                            />

                            <p>
                                Login
                            </p>

                        </Link>

                    )}

                </nav>

            </div>

        </header>

    );

}


export default Navbar;