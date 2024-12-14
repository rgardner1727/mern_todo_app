import { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

const FooterComponent = () => {
    
    const {isAuthenticated} = useContext(AuthenticationContext);
    
    if(!isAuthenticated)
        return (<></>)
    return (
        <footer className="footer">
            <div>
                <ul>
                    <li>LinkedIn</li>
                    <li>Some information</li>
                    <li>Some other information</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>GitHub</li>
                    <li>Some information</li>
                    <li>Some other information</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>Codecademy</li>
                    <li>Some information</li>
                    <li>Some other information</li>
                </ul>
            </div>
        </footer>
    )
}

export default FooterComponent;