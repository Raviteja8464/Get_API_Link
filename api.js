const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3030;

// Connection URI
const uri = 'mongodb+srv://karadaraviteja:Teja84648@raviteja.uqeyhfb.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'sample_analytics';
const collectionName = 'accounts';

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri, options);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to Database');

        // Access the database
        const db = client.db(dbName);

        // Access the collection
        const collection = db.collection(collectionName);


        // Fetch data from MongoDB
        //GET request handler '/api/get/admitkard/dnaTeam/getdata'
        app.get('/api/get/admitkard/dnaTeam/getdata/newdata', async (req, res) => {
            try {
                const query = {}; // Empty query to fetch all documents ex: hasRings:true
                const documents = await collection.find(query).toArray();
                res.json(documents);
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // Connect to MongoDB when the server starts
    connectToMongoDB();
});
