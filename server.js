const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const scoreboard = require('./controllers/scoreboard');
const config = require('./config/database');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('Hello World app');
});

// mongoose.connect(config.database);
app.use('/scoreboard',scoreboard);

app.listen(port,function(){
    console.log('server is run on port:' + port);
});
