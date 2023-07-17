const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient,ObjectId } = require('mongodb');



const url = "mongodb+srv://admin:Password@database.zltuqrc.mongodb.net/";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors({
  origin:["https://agent-portal-front.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));

app.get("/",(req,res) =>{
  res.json("hello");
})

app.get('/clients', async (req, res) => {
  try {
    await client.connect();
    const collectionf= client.db("dataBase").collection("clients");
    const clients = await collectionf.find({month: req.query.name}).toArray();
    res.json(clients);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/details', async (req, res) => {
  try {
    await client.connect();
    const collectionf= client.db("dataBase").collection("clients");
    const objectId = new ObjectId(req.query.name);
    const clients = await collectionf.find({ _id: objectId }).toArray();

    res.json(clients);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/login', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db("dataBase").collection("users");
      const existingUser = await collection.findOne({ usr: req.body.usr });
      
      if (existingUser) {
        if(req.body.pass === existingUser.pass){
          res.json({ message: '1' });
        }
        else{
          res.json({message:'0'})
        }
      } else {
        res.json({ message: '-1' });
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).json({ message: 'Error connecting to MongoDB' });
    }
  });

app.post('/add', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("clients");
    await collection.insertOne({ name: req.body.data.name ,phno:req.body.data.phno,co:req.body.data.co, date : req.body.data.date , vno : req.body.data.vno , pno : req.body.data.pno , amt : req.body.data.amt , paid : req.body.data.paid , extra :req.body.data.extra , month: req.body.month});
    res.json({message:'1'})
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/editt', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("clients");
    const objectId = new ObjectId(req.body.data.id);
    const filter = { _id: objectId };
    const update = {
      $set: {
        name: req.body.data.name,
        phno: req.body.data.phno,
        co: req.body.data.co,
        date: req.body.data.date,
        vno: req.body.data.vno,
        pno: req.body.data.pno,
        amt: req.body.data.amt,
        paid: req.body.data.paid,
        extra: req.body.data.extra,
      }
    };
    
    await collection.updateOne(filter, update);
     res.json({message:'1'})
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

const port = 3001;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});