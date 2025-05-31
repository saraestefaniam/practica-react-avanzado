import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/forma-abstracta-black.png"
import "./header.css"
import { useAuth } from "../../pages/auth/auth-context";

function Header({}) {
    const { isLogged, onLogout } = useAuth();

    return (
    <header className="header">
        <Link to="/" className="logo">
            <div>
                <img src={logo} width={32} height={32} />
            </div>
        </Link>

        <nav className="nav">
            <NavLink to="/adverts/new" className="nav-link">
                New Advert
            </NavLink>

            {isLogged ? (
                <button className="nav-button-session" onClick={onLogout}>
                    Logout
                </button>
            ) : (
                <NavLink to="/login" className="nav-button-session">
                    Login
                </NavLink>
            )}
        </nav>
    </header>
    )
}

export default Header;