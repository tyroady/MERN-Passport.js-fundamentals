import React, { useState } from "react";
import axios from "axios";

export default function Register(){
 
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(e){
        e.preventDefault();
        


        setUserName("");
        setPassword("");
    }

    return (
      <form onSubmit={handleSubmit} className="registerForm"><div className="container">
            
            <h2>Welcome {userName}</h2>
            <input placeholder="email" type="email" value={userName} 
            onChange={(e)=> {setUserName(e.target.value); console.log(e); console.log(e.target);}}/>
            <input placeholder="password" value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Sign In</button>
            <a href="http://localhost:5000/auth/google">Or continue with Google</a>
            <img alt="File:Google &quot;G&quot; logo.svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png?20230822192911" decoding="async" width="24" height="24" srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/36px-Google_%22G%22_logo.svg.png?20230822192911 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/48px-Google_%22G%22_logo.svg.png?20230822192911 2x" data-file-width="24" data-file-height="24"></img>
        </div></form>

    )}