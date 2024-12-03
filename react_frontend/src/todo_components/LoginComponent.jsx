import axios from "axios"
import { useState } from "react"
const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        axios.post("http://localhost:3000/login", {username, password})
            .then((response) => console.log(response.data))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login to view your todos.</h2>
                <fieldset>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username."></input>
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password."></input>
                </fieldset>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginComponent;