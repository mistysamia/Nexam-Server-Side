const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ljzsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        const database = client.db('nexam');
       /* const productCollection = database.collection('products');
        const reviewCollection = database.collection('Review');
        const orderCollection = database.collection('Order');
        const orderRequest = database.collection('OrderRequest');
        const adminCollection = database.collection('Admin');*/
        const libraryCollection = database.collection('library');
        const orderRequest = database.collection('statdata');

        //GET products API
        app.get('/library', async (req, res) => {
            const cursor = libraryCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let products;

            console.log(cursor);
            // const count = await cursor.count();
            // if (page) {
            //     products = await cursor.skip(page * size).limit(size).toArray();
            // }
            // else {
            //     products = await cursor.toArray();
            // }

            // res.send({
            //     count,
            //     products
            // });
        });

        //GET review API
        app.get('/review', async (req, res) => {
            const cursor = reviewCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let review;
            const count = await cursor.count();

            if (page) {
                review = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                review = await cursor.toArray();
            }

            res.send({
                count,
                review
            });
        });

        //GET products API
        app.get('/orderrequestdisplay', async (req, res) => {
            const cursor = orderRequest.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let orderRequestDisplay;
            const count = await cursor.count();

            if (page) {
                orderRequestDisplay = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                orderRequestDisplay = await cursor.toArray();
            }

            res.send({
                count,
                orderRequestDisplay
            });
        });

        //GET allaOrderDisplay API
        app.get('/allorderdisplay', async (req, res) => {
            const cursor = orderCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let allOrderDisplay;
            const count = await cursor.count();

            if (page) {
                allOrderDisplay = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                allOrderDisplay = await cursor.toArray();
            }

            res.send({
                count,
                allOrderDisplay
            });
        });


         //GET Admin API
      
            app.get('/admindisplay', async (req, res) => {
                const cursor = adminCollection.find({});
                const page = req.query.page;
                const size = parseInt(req.query.size);
                let admins;
                const count = await cursor.count();

                if (page) {
                    admins = await cursor.skip(page * size).limit(size).toArray();
                }
                else {
                    admins = await cursor.toArray();
                }

                res.send({
                    count,
                    admins
                });
            });

        // Add review API
        app.post('/addnewreview', async (req, res) => {
            const order = req.body;
            const result = await reviewCollection.insertOne(order);
            res.json(result);
        })

        // Add Admin API
     
        app.post('/addnewadmin', async (req, res) => {
            const order = req.body;
            const result = await adminCollection.insertOne(order);
            res.json(result);
        })

        // Use POST to get data by keys
        app.post('/products/byKeys', async (req, res) => {
            const keys = req.body;
            const query = { key: { $in: keys } }
            const products = await productCollection.find(query).toArray();
            res.send(products);
        });

        // Add OrdersRequest API
        app.post('/addordersrequest', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
            const result1 = await orderRequest.deleteOne({ "userId": order.userId });
            res.json(result1);
        })

        // Add Delete Orders Req API
        app.post('/deleteordersreq', async (req, res) => {
            const order = req.body;
            const result = await orderRequest.deleteOne({ "userId": order.userId });
            res.json(result);
        })

         // Add Delete Admin  API
         app.post('/deleteadmin', async (req, res) => {
            const order = req.body;
            const result = await adminCollection.deleteOne({ "adminId": order.adminId });
            res.json(result);
        })

        // Add Delete Product Req API
        app.post('/deleteproduct', async (req, res) => {
            const order = req.body;
            const result = await productCollection.deleteOne({ "productId": order.productId });
            res.json(result);
        })

        // Add Delete Orders API

        app.post('/deleteorders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.deleteOne({ "userId": order.userId });
            res.json(result);
        })

        // Add new Package API
        app.post('/addnewpackage', async (req, res) => {
            const order = req.body;
            const result = await productCollection.insertOne(order);
            res.json(result);
        })

        //  Delete Review API
        app.post('/deletereview', async (req, res) => {
            const order = req.body;
            const result = await reviewCollection.deleteOne({ "reviewId": order.reviewId });
            res.json(result);
        })



        // Add Request Orders API
        app.post('/orderrequest', async (req, res) => {
            const request = req.body;
            const newOrder = await orderRequest.insertOne(request);
            res.json(newOrder);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/lib', (req, res) => {
    const cursor = libraryCollection.find({});
    const page = req.query.page;
    const size = parseInt(req.query.size);
    let products;

    console.log(cursor);
});

app.get('/', (req, res) => {
    res.send('HanDCraft ');
});
app.get('/handCraft', (req, res) => {
    res.send('xx start is running by MISTY');
});

app.listen(port, () => {
    console.log('Server running at port', port);

});