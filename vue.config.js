const fs = require('fs')

module.exports = {
    devServer: {
        https: true,
        key: fs.readFileSync('./certs/example.com+5-key.pem'),
        cert: fs.readFileSync('./certs/example.com+5.pem'),
        host: "app.example.com",
        port: "8000"
    }            
}