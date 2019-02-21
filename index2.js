var request = require("request"),
    cheerio = require("cheerio"),
    url = "https://www.farpost.ru/vladivostok/realty/rent_flats/?page=2#map=open&center=14692592.463331528,5338449.6402894715&zoom=11" ;

request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            temperature = $("[] .bulletinLink auto-shy").html();

        console.log( temperature  );
    } else {
        console.log("Произошла ошибка: " + error);
    }
    console.log(url);
});