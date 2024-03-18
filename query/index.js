const express = require('express')
const axios = require('axios')
const cors =require('cors')
const app = express()
app.use(express.json())
app.use(cors()) //cors is required here because the client makes a call to this microservice

const posts= {}

//any time some one wants to get all the comments for a post, essentially a join
app.get('/posts',(req,res)=>{
    res.send(posts)
})

//handle all comment related events
app.post('/events',(req,res)=>{
    const {type, data} = req.body
    handleEvent(type,data)


    res.send({})
})

const handleEvent = (type, data)=>{
    if(type === 'PostCreated'){
        const {id,title} = data
        posts[id]={id,title,comments:[]}
    }

    //will automatically add comment upon creation
    if(type === 'CommentCreated'){
        const {id,content,postId,status} = data
        const post = posts[postId]
        post.comments.push({id,content,status})
    }

    //will automatically update comment
    if(type === 'CommentUpdated'){
        const {id,status,postId, content} = data
        const post = posts[postId]
        const comment = post.comments.find(comment=> comment.id===id)
        comment.status=status
        comment.content=content
    }
}

app.listen(4002, async ()=>{
    console.log('listening on port 4002')

    //when this function is called it is a good idea to sync up events with the event bus
    try{
        const res = await axios.get('http://event-bus-srv:4005/events')
        for (let event of res.data){
            console.log('Processing event:', event.type)
            handleEvent(event.type, event.data)
        }
    }catch (e) {
        console.log(e)
    }

})