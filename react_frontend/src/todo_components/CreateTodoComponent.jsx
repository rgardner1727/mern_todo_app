import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';
import UsernameContext from '../contexts/UsernameContext';
import '../todo_css/todos.css';

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
        <div className="container">
            <form className="custom-form" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor='text'>Text</label>
                    <input type='text' id='text' name='text' value={text} onChange={e => setText(e.target.value)}/>
                </fieldset>
                <button className="submit-button" type='submit'>Create Todo</button>
            </form>
        </div>
    )
}

export default CreateTodoComponent;