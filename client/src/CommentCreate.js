import React, {useState} from "react";
import axios from "axios";

const CommentCreate = ({postId})=>{

    const [content,setContent]=useState('')

    const onSubmit =async (event)=>{
        event.preventDefault()

        //post request to comments service to create a comment for a post
        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content
        }).catch((err) => {
            console.log(err.message);
        });

        setContent('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input value={content} onChange={event => setContent(event.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default CommentCreate;