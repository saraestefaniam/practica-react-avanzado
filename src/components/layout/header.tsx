import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/forma-abstracta-black.png"
import "./header.css"
import { useAuth as useAuthHook, useLogoutAction } from '../../store/hooks';


function Header({}) {
    const isLogged = useAuthHook();
    const onLogout = useLogoutAction()

    return (
    <header className="header">
        <Link to="/" className="logo">
            <div>
                <img src={logo} width={32} height={32} />
            </div>
        </Link>

        <nav className="nav">
            <NavLink to="/adverts" className="nav-link">
                Adverts
            </NavLink>
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