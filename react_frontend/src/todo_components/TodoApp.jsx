import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import DisplayTodosComponent from "./DisplayTodosComponent";
import { TokenContextProvider } from "../contexts/TokenContext";
import { UsernameContextProvider } from "../contexts/UsernameContext";
import UpdateTodoComponent from "./UpdateTodoComponent";
import CreateTodoComponent from "./CreateTodoComponent";
import RegisterComponent from "./RegisterComponent";

const TodoApp = () => {
    return (
        <TokenContextProvider>
            <UsernameContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/register' element={<RegisterComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/todos/:username' element={<DisplayTodosComponent/>}/>
                        <Route path='/todos/:username/:id' element={<UpdateTodoComponent/>}/>
                        <Route path='/todos/:username/createTodo' element={<CreateTodoComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </UsernameContextProvider>
        </TokenContextProvider>
    )
}

export default TodoApp;