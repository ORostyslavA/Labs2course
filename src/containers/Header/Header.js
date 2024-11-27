import "./Header.css"
import logo from "../../components/images/logo.png";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    return (
        <header className="header">    
            <img className="logo" src={logo} alt="logo" />
            <Navigation />
            {location.pathname === '/catalog' && (
                <div>
                </div>
            )}
        </header>
    )
}

export default Header;