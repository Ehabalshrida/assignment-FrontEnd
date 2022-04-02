import React from "react";
import { Link } from "react-router-dom";
import Login from "./auth/login"
import Auth from "./auth/auth"

function Header() {
  return (
    <>
     
         

      <nav className="bp3-navbar .modifier bp3-dark" >
      <Auth>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">TO-DO</div>
          
        </div>
        <div className="bp3-navbar-group bp3-align-right">
        <Link className="bp3-button bp3-minimal bp3-icon-home" to="/">Home</Link>
         
          <span className="bp3-navbar-divider"></span>
          <Link className="bp3-button bp3-minimal bp3-icon-cog" to="/form">Setting</Link>
          
        </div>
        </Auth>

        <Login/>
      </nav>
    </>
  );
}

export default Header;