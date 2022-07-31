const port = process.env.PORT || 3000
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())


const appRouter = express.Router()
app.use('/api/v3/app',appRouter);

appRouter
    .route('/events')
    .get(getEvent)
    .post(postEvent)

appRouter
    .route('/events/:id')
    .get(getEventbyUid)
    .put(putEvent)
    .delete(deleteEvent)

    const db_link = 'mongodb+srv://admin:7Tkg5ctIAGMixt4j@cluster0.iqcrx.mongodb.net/?retryWrites=true&w=majority';
    mongoose.connect(db_link)
    .then(db=>{
        console.log('conected',db);
    })
    .catch(err=>{
        console.log('error',err);
    })

app.listen(port,(err)=>{
    if(err) console.log('ERROR', err);
    console.log('server running at port no. ',port);
})


// postEvent
function postEvent(req,res)
{
    res.send({message : 'posted'})
}

// deleteEvent
function deleteEvent(req,res)
{
    res.send({message : 'deleted',
    id : req.params.id})
}

// putEvent
function putEvent(req,res)
{
    res.send({message : 'putted',
    id : req.params.id})
}

// getEvent
function getEvent(req,res)
{
    res.send({message : 'get',
    query : req.query})
}

// getEventbyUid
function getEventbyUid(req,res)
{
    res.send({message : 'get',
    id : req.params.id})
}