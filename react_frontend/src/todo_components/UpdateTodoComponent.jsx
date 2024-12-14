import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthenticationContext from '../contexts/AuthenticationContext';

const UpdateTodoComponent = () => {
    const [text, setText] = useState('');
    
    const id = useParams().id;

    const navigate = useNavigate();

    const username = useParams().username;

    const {token, setToken} = useContext(AuthenticationContext);

    useEffect(() => {
        const retrieveTodo = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/todos/${username}/${id}`, {headers: {Authorization: `Bearer ${token}`}});
                if(response.status !== 200)
                    return;
                setText(response.data.text);
            }catch(err){
                console.log(err);
            }
        }
        retrieveTodo();
    }, [id]);
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.put(`http://localhost:3000/todos/${username}/${id}`, {text}, {headers: {Authorization: `Bearer ${token}`}});
            if(response.status !== 204)
                return;
            navigate(`/todos/${username}`);
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.delete(`http://localhost:3000/todos/${username}/${id}`, {headers: {Authorization: `Bearer ${token}`}});
            if(response.status !== 204)
                return;
            navigate(`/todos/${username}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <main className='main'>
            <form className="form">
                <h2>Update/Delete Todo</h2>
                <fieldset>
                    <label htmlFor='text'>Text</label>
                    <input type='text' id='text' name='text' value={text} onChange={e => setText(e.target.value)}/>
                </fieldset>
                <div className='multi-button-container'>
                    <button className='submit-button' type='submit' onClick={handleUpdate}>Update</button>
                    <button className='submit-button' type='submit' onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </main>
    )
}

export default UpdateTodoComponent;