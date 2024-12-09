import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import DisplayTodosComponent from "./DisplayTodosComponent";
import { TokenContextProvider } from "../contexts/TokenContext";
import { UsernameContextProvider } from "../contexts/UsernameContext";
import UpdateTodoComponent from "./UpdateTodoComponent";
import CreateTodoComponent from "./CreateTodoComponent";

const TodoApp = () => {
    return (
        <TokenContextProvider>
            <UsernameContextProvider>
                <BrowserRouter>
                    <Routes>
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