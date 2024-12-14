import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthenticationContext from '../contexts/AuthenticationContext';

const CreateTodoComponent = () => {
    const {token} = useContext(AuthenticationContext);

    const navigate = useNavigate();

    const username = useParams().username;

    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/todos/${username}`, {text}, {headers: {Authorization: `Bearer ${token}`}});
            if(response.status !== 201)
                return;
            navigate(`/todos/${username}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <main className='main'>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Create Todo</h2>
                <fieldset>
                    <label htmlFor='text'>Text</label>
                    <input type='text' id='text' name='text' value={text} onChange={e => setText(e.target.value)}/>
                </fieldset>
                <button className="submit-button" type='submit'>Create Todo</button>
            </form>
        </main>
    )
}

export default CreateTodoComponent;