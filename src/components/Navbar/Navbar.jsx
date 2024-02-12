import { useEffect, useState } from "react";
import "./navbar.css";

import { useNavigate } from "react-router-dom";

const Navbar = ({ active }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Profile"))
      setUser(JSON.parse(localStorage.getItem("Profile")));
  }, []);

  return (
    <nav>
      <a href="/">
        <span className="logo">DocConnect</span>
      </a>
      <div className="buttons">
        {user ? (
          <>
            <button
              className="btn"
              onClick={() => {
                localStorage.setItem("Profile", "");
                navigate("/");
              }}
            >
              Logout
            </button>
            <a href="/profile">
              <button className="btn profile-btn">
                <i className="fa-solid fa-user"></i>
              </button>
            </a>
          </>
        ) : (
          <>
            <a href="/signup">
              <button className={active === "signup" ? "btn active" : "btn"}>
                Signup
              </button>
            </a>
            <a href="/login">
              <button className={active === "login" ? "btn active" : "btn"}>
                Login
              </button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
