import React, {useState, useEffect} from "react";
import Link from '@mui/joy/Link';
import Post from "../components/post";

export default function HomePage() { 
        const [backendData, setBackendData] = useState({}); 
  useEffect(() => {
    fetch("http://localhost:5000/api").then( 
      response => response.json()
    ).then(
      data => setBackendData(data)
    ).catch(error => console.log("Fetch error:", error));
  },[]);
  


  return (<div>

<div className="container text-center"><div className="row justify-content-md-center"><div className="col">
  
 <Link color="primary" disabled={false} level="h1" underline="none" variant="soft" href="/">Home</Link></div>
      <div className="col">
  <Link color="primary"
  disabled={false}
  level="h1"
  underline="none"
  variant="soft" href="/addpost">Create Post</Link></div>

  <div className="col">
  <Link color="primary" disabled={false} level="h1" underline="none" variant="soft" href="/register">Sign In</Link></div>

    <div className="col-4">   
  <Link color="primary"
  disabled={false}
  level="h1"
  underline="none"
  variant="soft" href="/contact">Contact</Link></div></div> </div> 
    
    
    {(typeof backendData.Posts === "undefined") ? <p>Loading...</p>
    : backendData.Posts.map((post,i) => (<Post key={post._id} title={post.postTitle} body={post.postBody}/>))}

  </div>)
}