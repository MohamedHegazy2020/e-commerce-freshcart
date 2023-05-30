import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import logo from "../../Assets/freshcart-logo.svg";
export default function Navbar() {
  function setAtiveNavItem(elem) {
    $(".nav-link").removeClass("active");

    $(elem).addClass("active");
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-capitalize active "
                  onClick={(e) => {
                    setAtiveNavItem(e.target);
                  }}
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-capitalize "
                  onClick={(e) => {
                    setAtiveNavItem(e.target);
                  }}
                  to="/brands"
                >
                  brands
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-capitalize "
                  onClick={(e) => {
                    setAtiveNavItem(e.target);
                  }}
                  to="#"
                >
                  cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
