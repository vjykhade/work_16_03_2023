import Home from "./pages/home/Home";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  const RequiredAuth = ({children}) =>{
    return currentUser ? (children) : <Navigate to="/login"/>
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
   <BrowserRouter>
   <Routes>
    <Route path="login" element={<Login />}/>
    <Route path="/">
    <Route index element={<RequiredAuth><Home/></RequiredAuth>}/>
    
    <Route path="users">
     <Route index element={<RequiredAuth><List type="users"/></RequiredAuth>} /> 
     <Route path=":userId" element={<RequiredAuth><Single type="users"/></RequiredAuth>} />
     <Route path="new" element={<RequiredAuth><New inputs = {userInputs} title="Add New User" type="users" /></RequiredAuth>} />
    </Route>
    <Route path="products">
     <Route index element={<RequiredAuth><List type="products"/></RequiredAuth>} /> 
     <Route path=":productId" element={<RequiredAuth><Single type="products"/></RequiredAuth>} />
     <Route path="new" element={<RequiredAuth><New inputs = {productInputs} title="Add New Product" type="products"/></RequiredAuth>} />
    </Route>
    </Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
