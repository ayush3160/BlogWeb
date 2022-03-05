import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Home from "./components/Home"
import MyBlog from "./components/MyBlog";
import CreateBlog from "./components/createBlog";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function App() {

  const [login,setLogin] = useState(0)

  const handleLogin = () => {
    setLogin(login+1)
  }
  return (
    <Router>
      <Navbar login = {login}/>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/login" element={<Login handleLogin = {handleLogin}/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/home/blogs" element={<MyBlog />}/>
        <Route path="/home/createblogs/:id/:name" element={<CreateBlog />}/>
      </Routes>
    </Router>
  );
}
