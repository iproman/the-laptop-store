const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'UTF-8');
const laptopData = JSON.parse(json);

const server = http.createServer((request, res) => {
    const id = url.parse(request.url, true).query.id;
    const pathName = url.parse(request.url).pathname;

    // PRODUCT OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        fs.readFile(`${__dirname}/templates/overview.html`, 'utf-8',
            (err, data) => {
                let overviewOutput = data;
                fs.readFile(`${__dirname}/templates/card.html`,
                    'utf-8',
                    (err, data) => {
                        const cardsOutput = laptopData.map(el => replaceTemplate(data, el));
                        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
                        res.end(overviewOutput);
                    }
                );
            })

        // LAPTOP DETAIL
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        fs.readFile(`${__dirname}/templates/laptop.html`, 'utf-8',
            (err, data) => {
                let laptop = laptopData[id];
                const output = replaceTemplate(data, laptop)
                res.end(output);
            })


    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('404 Not found url')
    }
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
