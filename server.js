'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('mongoose is connected');
});

app.get('/test', (request, response) => {
  response.status(200).send('test request received');
});

app.get('*', (request, response) => {
  response.status(404).send('this is not what you were looking for');
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
