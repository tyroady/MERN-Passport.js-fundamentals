import React from "react";
import AddPost from "../components/AddPost";
import axios from 'axios'; 

export default function AddPage() {

    function addNewPost(title, body){ //title ve body componentin içindeki yerel statelerden geliyor.
       axios.post("http://localhost:5000/addPost", {
        serverTitle : title,
        serverBody: body
       }, { withCredentials: true }).then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error + "Hata");
      });
    
    
    }

    
    return (<AddPost addPost={addNewPost}/>)
}