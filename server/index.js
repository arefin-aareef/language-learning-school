const express = require('express');
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization) {
    return res.status(401).send({error: true, message: 'unauthorized access'})
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({error: true, message: 'unauthorized access'})
    }
    req.decoded = decoded
    next()
  })
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sypbrfe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const usersCollection = client.db("schoolDb").collection('users')
    const classesCollection = client.db("schoolDb").collection('classes')
    const instructorsCollection = client.db("schoolDb").collection('instructors')
    const dashboardCollection = client.db("schoolDb").collection('dashboard')

    // jwt api

    app.post('/jwt', (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100h'})
      res.send({ token })
    })

    // user api

    app.post('/users', async(req, res) => {
      const user = req.body;
      const query = {email: user.email}
      const existingUser = await usersCollection.findOne(query)
      if(existingUser) {
        return res.send({ message: 'user already exists'})
      }
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.patch('/users/admin/:id', async(req, res) => {
      const id =req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
         $set: {
          role: 'admin'
         }
      }
      const result = await usersCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.patch('/users/instructor/:id', async(req, res) => {
      const id =req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
         $set: {
          role: 'instructor'
         }
      }
      const result = await usersCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query)
      res.send(result)
    })


    // class api

    app.get('/classes', async(req, res) => {
        const result = await classesCollection.find().toArray()
        res.send(result)
    })

    // instructor api

    app.get('/instructors', async(req, res) => {
        const result = await instructorsCollection.find().toArray()
        res.send(result)
    })


    // dashboard api

    app.post('/dashboard', async(req, res) => {
        const item = req.body
        const result = await dashboardCollection.insertOne(item)
        res.send(result)
    })

    app.get('/dashboard', verifyJWT, async(req, res) => {
      const email = req.query.email
      if(!email){
        res.send([])
      } 

      const decodedEmail = req.decoded.email
      if(email !== decodedEmail){
        return res.status(401).send({error: true, message: 'forbidden access'})
      }

      const query = { email: email}
      const result = await dashboardCollection.find(query).toArray()
      res.send(result)
    })

    app.delete('/dashboard/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dashboardCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('pyrates-school is running')
})
app.listen(port, () => {
    console.log(`Pyrates-School is running on port ${port}`);
})