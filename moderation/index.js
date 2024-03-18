const express = require('express')
const axios = require('axios')
const app = express();
app.use(express.json())

//read events from the event bus where a comment is created
//it will moderate and sent CommentModerated to the eventbus in order for it to send signals to all services
//the comment service reads this event and will make the update and then send an CommentUpdated event so all service
//interested in comments can update
//if we stop the moderation service comments will be stuck in pending
app.post('/events',async (req,res)=>{
    const {type, data} = req.body

    if(type === 'CommentCreated'){
        const status =  data.content.includes('orange')?'rejected':'approved'

        //send post request to eventbus that comment is updated
        await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentModerated',
            data:{
                id: data.id,
                postId:data.postId,
                status,
                content:data.content,
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({})
})

app.listen(4003, ()=>{
    console.log('listening on port 4003')
})