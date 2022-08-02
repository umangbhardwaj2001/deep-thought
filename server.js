const port = process.env.PORT || 3000
const express = require('express')
const { Collection, ObjectId } = require('mongodb')
const dbConnect = require('./db')

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

app.listen(port,(err)=>{
    if(err) console.log('ERROR', err);
    console.log('server running at port no. ',port);
})


// postEvent
async function postEvent(req,res)
{
    let collection = await dbConnect();
    let result = await collection.insertOne(req.body);
    res.send(result);
}

// deleteEvent
async function deleteEvent(req,res)
{
    let collection = await dbConnect();
    let result = await collection.deleteOne(req.body)
    res.send(result);
}

// putEvent
async function putEvent(req,res)
{
    let collection = await dbConnect();
    let result = await collection.updateOne({_id:ObjectId(req.params.id)},{
        $set:req.body
    })
    res.send(result);
}

// getEvent
async function getEvent(req,res)
{
    let collection = await dbConnect();
    let result = await collection.find().toArray();
    res.send(result);
}

// getEventbyUid
async function getEventbyUid(req,res)
{
    let collection = await dbConnect();
    let result = await collection.findOne({_id:ObjectId(req.params.id)})
    res.json({data : result})
}