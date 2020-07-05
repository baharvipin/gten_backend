const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const SignupData = require('./src/schema/credData');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.post('/signup',cors(), (req, res) => {
    mongoClient.connect(url, (error, client) => {
        if (error) throw error;

        let db = client.db('gtenDatabase');
        db.collection('credentials').findOne({email: req.body.email}, (err, doc) => {
            if (doc) return res.status(400).json('User already exist!');
            
            let user = new SignupData({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                mobile: req.body.mobile
            });

            db.collection('credentials').insertOne(user, () => {
                res.status(200).json('Account created successfully!');
            });
        });
    });
});

app.post('/signin',cors(), (req, res)=>{
    mongoClient.connect(url, (error, client) =>{
        if(error) throw error;

        let db = client.db('gtenDatabase');
        db.collection('credentials').findOne({email: req.body.email, password: req.body.password}, (err, doc) =>{
            if (!doc)
                return res.status(400).json('User credentials are not vaild!');

            console.log('doc',doc);
            return res.status(200).json({data: doc})

        })

    });

});

app.listen(4000, console.log('Listening to port: 4000'));