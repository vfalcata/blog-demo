import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

//loads html returned from App inside the root element
ReactDOM.render(
    <App/>,
    document.getElementById('root') //just a reminder if you go to the public files you are given a div with id root on the index.html, this is where we render the root component too
)