const fs = require('fs');
const http = require('http');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'UTF-8');
const laptopData = JSON.parse(json);

const server = http.createServer((request, res) => {
})

server.listen(8080, '127.0.0.1', () => {
    console.log('Started listening for requests now');
});
