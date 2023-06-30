import { NavLink } from "react-router-dom";
import './style/header-style.css'

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <NavLink to="/" className="logo-text">Matches Game</NavLink> 
      </div>
    </div>
  );
}

export default Header;