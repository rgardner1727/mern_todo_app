import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TokenContext from "../contexts/TokenContext";
import UsernameContext from "../contexts/UsernameContext";

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {token, setToken} = useContext(TokenContext);

    const {usernameContext, setUsernameContext} = useContext(UsernameContext);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username)
            return setErrorMessage({message: 'Username is required'});
        if(!password)
            return setErrorMessage({message: 'Password is required'});
        try{
            const response = await axios.post('http://localhost:3000/login', {username, password});
            const jwtToken = response.data.token;
            setToken(jwtToken);
            setUsernameContext(username);
            navigate(`/todos/${usernameContext}`);
        }catch(err){
            if(err.status === 404)
                return setErrorMessage({message: 'Invalid username'});
            if(err.status === 401)
                return setErrorMessage({message: 'Invalid password'});
            setErrorMessage({message: 'Error logging in'});
        }
    }

    return (
        <main>
            <form className="custom-form" onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage.message}</p>}
                <h2>Login to view your todos.</h2>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username."></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password."></input>
                </fieldset>
                <button className="submit-button" type="submit">Login</button>
            </form>
        </main>
    )
}

export default LoginComponent;