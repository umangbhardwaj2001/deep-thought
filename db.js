const {MongoClient} = require('mongodb')
// const url = 'mongodb://127.0.0.1:27017'
const url = 'mongodb+srv://admin:aIEq1nfgHAmKQXXv@cluster0.iqcrx.mongodb.net/?retryWrites=true&w=majority'
const database='users-data'
const client = new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('meta-data')
}
module.exports = dbConnect;