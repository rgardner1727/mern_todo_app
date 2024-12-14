import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import DisplayTodosComponent from "./DisplayTodosComponent";
import { AuthenticationContextProvider } from "../contexts/AuthenticationContext";
import UpdateTodoComponent from "./UpdateTodoComponent";
import CreateTodoComponent from "./CreateTodoComponent";
import RegisterComponent from "./RegisterComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AuthenticatedRouteComponent from "./AuthenticatedRouteComponent";

const TodoApp = () => {
    return (
        <AuthenticationContextProvider>
            <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/register' element={<RegisterComponent/>}/>
                        <Route path='/todos/:username' element={<AuthenticatedRouteComponent><DisplayTodosComponent/></AuthenticatedRouteComponent>}/>
                        <Route path='/todos/:username/:id' element={<AuthenticatedRouteComponent><UpdateTodoComponent/></AuthenticatedRouteComponent>}/>
                        <Route path='/todos/:username/createTodo' element={<AuthenticatedRouteComponent><CreateTodoComponent/></AuthenticatedRouteComponent>}/>
                    </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </AuthenticationContextProvider>
    )
}

export default TodoApp;