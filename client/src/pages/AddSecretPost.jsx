import React, { useState, useEffect } from "react";
import AddPost from "../components/AddPost";
import axios from 'axios'; 

export default function AddSecretPost() {
    const [auth, setAuth] = useState(false);

    function addNewPost(title, body){ //title ve body componentin içindeki yerel statelerden geliyor.
       axios.post("http://localhost:5000/addSecretPost", {
        serverTitle : title,
        serverBody: body
       }, { withCredentials: true }).then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data + "Hata");
      });
    }

    useEffect(() => {
      // Use useEffect to trigger the authentication check after component mount
      axios.get("http://localhost:5000/addSecretPost", { withCredentials: true })
          .then((response) => {
              setAuth(response.data.authBoolean);
              console.log(response.data);
          })
          .catch((err) => console.log(err.response.data));
  }, []); // Empty dependency array ensures the effect runs once after mount


    

    
    return (<div>
        {(auth === false) ? <p>You are not authorized</p> : <AddPost h2="Secret" addPost={addNewPost}/>}

        </div>)
}