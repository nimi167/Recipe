import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

import Logo from "../components/Logo";
import { handleLogout } from "../utils/authUtils";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const location = useLocation(); // useLocation hook to get the current location

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, [location.pathname]); // Update state when the path changes

  return (
    <div>
      <div>
        <div className="container-lg container-fluid py-4">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <Logo />
              <button
                className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link  fw-medium" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  fw-medium" to="/Recipes">
                      Recipes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  fw-medium" to="/AddRecipe">
                      Add Recipe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  fw-medium" to="/Blog">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  fw-medium" to="/About">
                      About us
                    </Link>
                  </li>
                </ul>
                {isLoggedIn ? (
                  <>
                    <span className="navbar-text d-flex">
                      <Link className="nav-link colorBlack fw-medium" to="/">
                        <button
                          className="btn bgWhite boxShadowRed mx-1 px-4 boder-0"
                          onClick={() => handleLogout(setIsLoggedIn)}
                        >
                          Log out
                        </button>
                      </Link>
                    </span>
                  </>
                ) : (
                  <span className="navbar-text d-flex">
                    <Link className="nav-link colorBlack fw-medium" to="/Login">
                      <button className="btn bgWhite boxShadowRed mx-1 px-4 boder-0">
                        Log in
                      </button>
                    </Link>
                    <Link
                      className="nav-link colorWhite fw-medium"
                      to="/SignUp"
                      style={{ color: "white" }}
                    >
                      <button className="btn bgRed mx-1 boxShadowRed px-4 boder-0  colorWhite">
                        Sign Up
                      </button>
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
