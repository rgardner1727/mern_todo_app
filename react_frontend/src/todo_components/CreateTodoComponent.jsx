import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';
import UsernameContext from '../contexts/UsernameContext';

const CreateTodoComponent = () => {
    const {token} = useContext(TokenContext);

    const navigate = useNavigate();

    const {usernameContext} = useContext(UsernameContext);

    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/todos/${usernameContext}`, {text}, {headers: {Authorization: `Bearer ${token}`}});
            if(response.status !== 201)
                return;
            navigate(`/todos/${usernameContext}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <main>
            <form className="custom-form" onSubmit={handleSubmit}>
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