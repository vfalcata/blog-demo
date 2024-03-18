const express =require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(express.json()) //automaticaly convert json to a js object, no need for body-parser
app.use(cors()); //wire up as middleware, client calls this microservice so it is required
const posts={

}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts/create',async (req,res)=>{
    const id = randomBytes(4).toString('hex') //we want 4 bytes worth of random data
    const {title}= req.body
    posts[id]={
        id,title
    }

    //we will use axios to make a post request to the event-bus after the post is created
    await axios.post('http://event-bus-srv:4005/events',{
        type: 'PostCreated',
        data:{
            id,
            title
        }
    })
   .catch((err) => {
        console.log(err.message);
    });


    res.status(201).send(posts[id])
})

//we want to log any events that we received
app.post('/events',(req,res)=>{
    console.log('Received Event', req.body.type)
    res.send({});
})

app.listen(4000, ()=>{
    console.log('final')
    console.log('listening on port 4000')
})