const fs = require('fs');
const http = require('http');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'UTF-8');
const laptopData = JSON.parse(json);

const server = http.createServer((request, res) => {
})

server.listen(8080, '127.0.0.1', () => {
    console.log('Started listening for requests now');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCT_NAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}
