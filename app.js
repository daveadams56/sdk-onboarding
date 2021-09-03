const https = require('https');
const express = require('express');
const fs = require('fs')
const path = require('path')

const options = {
    key: fs.readFileSync('certs/example.com+5-key.pem'),
    cert: fs.readFileSync('certs/example.com+5.pem')
};

var app = express();
app.use('/', express.static(path.join(__dirname, 'dist')))

const server = https.createServer(options, app);
server.listen(8000);