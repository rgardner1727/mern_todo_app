import { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

const NavComponent = () => {

    const {isAuthenticated} = useContext(AuthenticationContext);

    if(!isAuthenticated) 
        return (<></>)
    return (
        <header>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">My GitHub</li>
                    <li className="nav-item">My LinkedIn</li>
                </ul>
                <ul className="nav-list-end">
                    <li className="nav-item">Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default NavComponent;