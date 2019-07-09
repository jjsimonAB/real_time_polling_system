const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Config = require('./config');

require('./config/db');

const app = express();

const poll = require('./routes/poll');

// here goes the public folder
app.use(express.static(path.join(__dirname, 'public')));

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: false
 }));

 app.use(cors());

 app.use('/poll', poll);

const port = Config.serverConfig.PORT;

app.listen(port, () => console.log(`server running @ ${port}`));
