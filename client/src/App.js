import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

//the view that will get loaded when app is called
//loads the PostCreate component
const App = ()=>{
    return <div className="container">
        <h1>Create Post</h1>
        <PostCreate/>
        <hr/>
        <h1>Posts</h1>
        <PostList/>
    </div>
}

export default App;