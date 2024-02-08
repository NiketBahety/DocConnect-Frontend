import "./navbar.css";

const Navbar = ({ active }) => {
  return (
    <nav>
      <a href="/">
        <span className="logo">DocConnect</span>
      </a>
      <div className="buttons">
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
      </div>
    </nav>
  );
};

export default Navbar;
