const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT|| 5000;

// middleware 
app.use(cors());
app.use(express.json())


// user : dbuser1
// pass: 68eScDdiusYhhJrE
const uri = "mongodb+srv://dbuser1:68eScDdiusYhhJrE@cluster0.mnhfjf2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{
    const userCollection=client.db("node-mongo-CRUD").collection("users");
 

    app.get('/users',async(req,res)=>{
      const query={};
      const cursor=userCollection.find(query);
      const users=await cursor.toArray();
      res.send(users);
       
    })



  app.post('/users',async(req,res)=>{
  const user=req.body;
  const result=await userCollection.insertOne(user);
  res.send(result);
  console.log(result);

});

app.delete('/users/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: ObjectId(id)}
  // console.log("delete",id)
 const result=await userCollection.deleteOne(query);
 console.log(result);
 res.send(result);
});








  }
  finally{

  }
}
run().catch(error=>console.log(error));







app.get('/', (req, res) => {
  res.send('Hello From Node Mongo CRUD server')
})


app.listen(port, () => {
  console.log(`Server Running on port ${port}`)
})