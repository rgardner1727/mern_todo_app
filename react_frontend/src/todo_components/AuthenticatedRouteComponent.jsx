import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";

const AuthenticatedRouteComponent = ({children}) => {

    const {isAuthenticated} = useContext(AuthenticationContext);

    if(!isAuthenticated)
        return <Navigate to='/login'/>;
    return children;
}

export default AuthenticatedRouteComponent;