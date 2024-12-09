import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import UsernameContext from "../contexts/UsernameContext";

const DisplayTodosComponent = () => {
    
    const [todos, setTodos] = useState([]);

    const {token, setToken} = useContext(TokenContext);

    const {usernameContext, setUsernameContext} = useContext(UsernameContext);

    const navigate = useNavigate();

    useEffect(() => retrieveTodos, []);

    const retrieveTodos = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/todos/${usernameContext}`, {headers: {Authorization: `Bearer ${token}`}});
            if(!response.status === 200)
                return alert('Failed to retrieve todos.');
            setTodos(response.data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <main>
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
                            todos.map(t => (
                                <tr className="selectable-row" key={t._id} onClick={() => navigate(`/todos/${usernameContext}/${t._id}`)}>
                                    <td>{t.text}</td>
                                    <td>{t.completed.toString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="submit-button"onClick={() => navigate(`/todos/${usernameContext}/createTodo`)}>Create New Todo</button>
            </div>
        </main>
    )
}

export default DisplayTodosComponent;