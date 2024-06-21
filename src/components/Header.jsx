import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/helpers";

const Header = () => {
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
          Logo
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
            <Link to="/firearms" className="nav-link">
              Firearms
            </Link>{" "}
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link" onClick={logUseOut}>
                  Logout
                </span>{" "}
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {user.email}
                </Link>{" "}
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>{" "}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
