import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if(!username)
            return setErrorMessage({message: 'Username is required'});
        if(!password)
            return setErrorMessage({message: 'Password is required'});
        try{
            const response = await axios.post('http://localhost:3000/register', {username, password});
            navigate('/login');
        }catch(err){
            if(err.status === 401)
                return setErrorMessage({message: 'User with the provided username already exists'});
            setErrorMessage({message: 'Error registering user'});
        }
    }

    return (
        <div className='container'>
            <form className='custom-form' onSubmit={handleSubmit}>
                {errorMessage && <p>{errorMessage.message}</p>}
                <h2>Register to create todos</h2>
                <fieldset>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter a username'></input>
                </fieldset>
                <fieldset>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter a password'></input>
                </fieldset>
                <button className='submit-button' type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterComponent;