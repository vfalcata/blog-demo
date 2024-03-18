import React, {useState} from "react";
import axios from "axios";



const PostCreate = ()=>{
    // What does useState return? It returns a pair of values: the current state and a function that updates it.
    // This is why we write const [title, setTitle] = useState(). This is similar to this.state.count and
    // this.setState in a class, except you get them in a pair.
    // the setFunction is used to update the current state
        const [title,setTitle]=useState('')
    //track the input for the title variable

    //post request to the api
    const onSubmit =async (event)=>{
        event.preventDefault()
        // The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled,
        // its default action should not be taken as it normally would be.

        //post request to POST SERVICE to create a new post
        await axios.post('http://posts.com/posts/create',{
            title
        }).catch((err) => {
            console.log(err.message);
        });

        setTitle('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={event => setTitle(event.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default PostCreate;