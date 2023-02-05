import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const u = localStorage.getItem("username");
    console.log('u', u)


    if (u) {

      setUsername(u.slice(1, u.length - 1));
    }
  }, []);
  const Logout = async () => {
    console.log('Logging out')
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate('/login');
    window.location.reload(true);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid px-5">

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          NitCsell
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/sell-product">
              Sell
            </NavLink>
          </div>
        </div>


        {
          username &&
          <>
            <div className="mx-2" style={{ color: "white" }}> Hello {username}</div>
            <button type="button" onClick={Logout} class="btn btn-outline-light mx-2">
              Logout
            </button>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
