const express =require('express')
const axios = require('axios')
const app = express()
app.use(express.json()) //automaticaly convert json to a js object

const events =[]

//Event bus will read all incoming events and then route them to all services,
//the services may or may not do something with the event.
//The event bus does not contain logic that filters the events. that logic is domain specific to the microservice
//This is a bare bones implementation to show the base innerworkings of an event bus
app.post('/events',(req,res)=>{
    const event = req.body //we do not know what the body will be
    events.push(event)
    //post service
    axios.post('http://posts-clusterip-srv:4000/events',event).catch((err) => {
        console.log(err.message);
    })

    //comment service
    axios.post('http://comments-srv:4001/events',event).catch((err) => {
        console.log(err.message);
    })

    //query service which is a join of post to comments
    axios.post('http://query-srv:4002/events',event).catch((err) => {
        console.log(err.message);
    })

    //moderation service to moderate comments
    axios.post('http://moderation-srv:4003/events',event).catch((err) => {
        console.log(err.message);
    })

    res.send({status:'OK'})
})

app.get('/events',(req,res)=>{
    res.send(events)
})

app.listen(4005,()=>{
    console.log('Listening on 4005')
})