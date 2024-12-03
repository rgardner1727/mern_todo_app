import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";

const TodoApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path="/welcome" element={<WelcomeComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default TodoApp;