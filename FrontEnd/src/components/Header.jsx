import { useState, useEffect, useRef } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CustomConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="button-pink" onClick={onConfirm}>
            Confirm
          </button>
          <button className="button-pink" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowConfirm(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header sticky">
      <div className="logo-container">
        <Link 
          to={isLoggedIn ? "/choose-what" : "/"} 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/v.png" alt="TechnoFy Logo" className="logo-img" />
        </Link>
      </div>

      <div className="mobile-menu-btn" onClick={toggleMenu} ref={burgerRef}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`navbar ${isMenuOpen ? "active" : ""}`} ref={menuRef}>
        <button onClick={() => scrollToSection("about")} className="nav-link">About</button>
        <button onClick={() => scrollToSection("contact")} className="nav-link">Contact</button>
        <button onClick={() => scrollToSection("help")} className="nav-link">Help</button>

        {isLoggedIn ? (
          <>
            <button className="button-nav" onClick={handleLogout}>Logout</button>
            <button className="nav-link" onClick={() => navigate("/profile")}>
              <FaUser /> {username}
            </button>
          </>
        ) : (
          <Link to="/login" className="button-nav">Login</Link>
        )}
      </nav>
      
      {showConfirm && (
        <CustomConfirmModal
          message="Are you sure you want to log out?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </header>
  );
}

export default Header;