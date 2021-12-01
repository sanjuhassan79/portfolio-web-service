const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port =process.env.PORT ||5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanju1.bssaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });






async function run() {
  try {
    await client.connect();
    const database = client.db("portfolio");
    const portfolioCollection = database.collection("portfolioItem");

    app.get('/products',async(req,res)=>{

      const cursor=portfolioCollection.find({})
        const result=await cursor.toArray()
        res.json(result)
    })


    app.get('/products/:id',async(req,res)=>{
    
      
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result=await portfolioCollection.findOne(query)
      res.json(result)
      })

   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

























app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})