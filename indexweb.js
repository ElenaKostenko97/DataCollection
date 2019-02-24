const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.farpost.ru/vladivostok/realty/rent_flats/?pageSize=50&plashka-off=1&ajax=1';

(async () => {

    const response = await request(URL);

    let $ = cheerio.load(response);

    let title = $('div[class="title"] > a').text();
    let price = $('span[data-role="price"]').text();

    console.log(title, price);
})()