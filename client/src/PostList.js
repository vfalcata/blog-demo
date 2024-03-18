import React, {useState,useEffect} from "react";
//useEffect to make sure we only try to fetch our listed post once when the post is created
//it can be used at very specific times at the lifecycle of a component
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ()=>{
    const [posts, setPosts] = useState({})

    //we want to run the function ONLY when this component is first displayed
    const fetchPosts = async ()=>{
        //get request to the QUERY SERVICE to retrieve posts and comments attached to them
        const res = await axios.get('http://posts.com/posts')
            .catch((err) => {
            console.log(err.message);
        });

        setPosts(res.data) //res.data gets the data from the response
    }
    useEffect(()=>{fetchPosts()},[])
    //the empty array second argument tells react to only run the function once

    const renderedPosts = Object.values(posts)
    //this is a js function that will give us an array of all the values of the object passed in to the function
    //this will be an array of post  objects
        .map(post =>{
            return <div className="card"
                        style={{width:'30%',marginBottom:'20px'}}
                        key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>

            </div>
        })

    //<CommentList postId={post.id}/>  recall you need to pass the post id to the CommentList function
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
}

export default PostList;