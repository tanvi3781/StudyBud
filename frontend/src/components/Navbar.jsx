import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.svg";

function Navbar() {
  // Later this will come from Context API
  const isAuthenticated = false;

  // Later this will come from your API
  const user = {
    username: "Tanvi",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
  };

  return (
    <header className="header header--loggedIn">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src={logo} alt="StudyBuddy Logo" />
          <h1>StudyBuddy</h1>
        </Link>

        {/* Search */}
        <form className="header__search">
          <label>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>search</title>

              <path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z" />
            </svg>

            <input
              type="text"
              placeholder="Search for rooms..."
              name="q"
            />
          </label>
        </form>

        <nav className="header__menu">

          {isAuthenticated ? (
            <>
              <div className="header__user">

                <Link to="/update-user">

                  <div className="avatar avatar--medium active">
                    <img src={user.image} alt="avatar" />
                  </div>

                  <p>
                    {user.username}
                    <span>@{user.username}</span>
                  </p>

                </Link>

                <button className="dropdown-button">

                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <title>chevron-down</title>

                    <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>

                  </svg>

                </button>

              </div>

              <div className="dropdown-menu">

                <Link to="/update-user" className="dropdown-link">
                  Settings
                </Link>

                <Link to="/logout" className="dropdown-link">
                  Logout
                </Link>

              </div>
            </>
          ) : (
            <Link to="/login">

              <img src={avatar} alt="avatar" />

              <p>Login</p>

            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar;