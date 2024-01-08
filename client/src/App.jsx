import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import AddPage from "./pages/AddPage";
import HomePage from "./pages/homePage";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import AddSecretPost from "./pages/AddSecretPost";

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addpost" element={<AddPage/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/addSecretPost" element={<AddSecretPost/>} />
    </Routes>
</BrowserRouter>)
}

export default App; 
  