import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/AuthenticationContext";

const DisplayTodosComponent = () => {
    
    const [todos, setTodos] = useState([]);

    const {token, setToken} = useContext(AuthenticationContext);

    const username = useParams().username;

    const navigate = useNavigate();

    useEffect(() => retrieveTodos, []);

    const retrieveTodos = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/todos/${username}`, {headers: {Authorization: `Bearer ${token}`}});
            if(!response.status === 200)
                return alert('Failed to retrieve todos.');
            setTodos(response.data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <main className="main">
            <div className="table-container">
                <h2>Your Todos</h2>
                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos ? 
                                todos.map(t => (
                                    <tr key={t._id} className="selectable-row" onClick={() => navigate(`/todos/${username}/${t._id}`)}>
                                        <td>{t.text}</td>
                                        <td>{t.completed.toString()}</td>
                                    </tr>
                                )) : <tr></tr>
                        }
                    </tbody>
                </table>
                <button className="submit-button"onClick={() => navigate(`/todos/${username}/createTodo`)}>Create New Todo</button>
            </div>
        </main>
    )
}

export default DisplayTodosComponent;