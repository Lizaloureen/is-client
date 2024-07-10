import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/helpers";
import { useState } from "react";

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const logUseOut = () => {
    localStorage.removeItem("isToken");
    localStorage.removeItem("isTokenData");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-container container">
        <Link to="/landing" className="logo" style={{ color: "white" }}>
          Fire Licencing
        </Link>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/applications" className="nav-link">
              Applications
            </Link>{" "}
          </li>
          <li className="nav-item">
            <Link to="/licences" className="nav-link">
              Licences
            </Link>{" "}
          </li>
          <li className="nav-item">
            <Link to="/firearms" className="nav-link">
              Firearms
            </Link>{" "}
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => setShowSubMenu(!showSubMenu)}
            >
              My Account
            </span>
          </li>
          {showSubMenu && (
            <div className="submenu">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      {user.email}
                    </Link>{" "}
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={logUseOut}>
                      Logout
                    </span>{" "}
                  </li>
                </>
              ) : (
                <li className="nav-item ">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>{" "}
                </li>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
