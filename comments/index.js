const express =require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(express.json()) //automaticaly convert json to a js object
app.use(cors()) //client calls this microservice so this is required

const commentsByPostId={

}

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []) //send an empty array to requested of id does not exist
})

//Comment creation:
//request is sent and CommentCreated event type is sent to the event bus and this object is returned to the sender
//the event bus passes the events to all services. The Comment moderation will check for comment created events
//it will moderate the comment, and then send a CommentUpdated event, which is read by the query service to
//update the status
app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex') //we want 4 bytes worth of random data
    const {content}= req.body
    const comments = commentsByPostId[req.params.id] || [] //if post id exists then get all comments with that post id else give an empty array
    comments.push({
            id: commentId,content,
        status:'pending'
    }) //push requested comment to comments

    //send to query service to immediately store copy of comment
    await axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data:{
            id: commentId,
            content,
            postId:req.params.id,
            status:'pending'
        }
    }).catch((err) => {
        console.log(err.message);
    });

    commentsByPostId[req.params.id] = comments //save the appended comments array
    res.status(201).send(comments)
})

//we want to log any events that we received where an update event occurred
//the moderation service can moderate a comment and we then have to emit an update event
app.post('/events',async (req,res)=>{
    const {type, data} = req.body

    if(type === 'CommentModerated'){
        const {postId,id,status, content} = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment=> comment.id===id)
        comment.status = status;
        //status is now updated so now we have to tell all services that an update has occured
        //we will emit CoommentUpdated event to the EventBus
        await axios.post('http://event-bus-srv:4005/events',{
            type:'CommentUpdated',
            data:{
                id,
                postId,
                status,
                content
            }
        }).catch((err) => {
            console.log(err.message);
        });
        console.log(commentsByPostId[postId])

    }

    res.send({});
})

app.listen(4001, ()=>{
    console.log('listening on port 4001')
})