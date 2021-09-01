const https = require('https');
const http = require('http');
const fs = require('fs')

const options = {
    key: fs.readFileSync('certs/example.com+5-key.pem'),
    cert: fs.readFileSync('certs/example.com+5.pem')
  };

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
  }).listen(8000);