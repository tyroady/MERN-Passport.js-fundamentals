import React, { useState } from "react";


   
export default function AddPost(props) {
    let year = new Date().getFullYear();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
      console.log(e);
        e.preventDefault();
        props.addPost(title, body);
        //Burada title ve body buradan, yerel state'den geliyor.
        //Bunu kullandığımız sayfadan gelmiyor yani.
        setTitle('');
        setBody('');
    };    
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new {props.h2} Post</h2>
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <input 
                    name="title" 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="body">Body</label>
                <textarea 
                    name="body" 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)}>
                </textarea>
            </div>
            <button type="submit" className="btn-submit">Add Post</button>
            <p className="copyright">Copyright {year}</p>
        </form>
    )
}