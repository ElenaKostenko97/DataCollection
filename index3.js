const axios = require("axios");
const cheerio = require("cheerio");
const concat = require("lodash/concat");
const range = require("lodash/range");


const tasks = { title: "tws", url: "https://www.farpost.ru/vladivostok/realty/rent_flats/?pageSize=50&plashka-off=1&ajax=1" };

async function load () {
	try {
		const map = range(1).map(it => {
			return axios.get(tasks.url, { params: { "page": 1 } });
		});
		const resolves = await Promise.all(map);

		const mapId = resolves.map(({ data }) => {
			const $ = cheerio.load(data);

			return $(".bull-item").map((i, el) => {
				const id = $(el).find("[data-bulletin-id]").data("bulletin-id");
				const title = $(el).find('div[class="title"] > a').text();
				const price = $(el).find('span[data-role="price"]').text();
				const adress = $(el).find('div[class="annotation auto-shy"]').text();

				return { id,title,price,adress };
			}).get();

		});

		console.log(mapId);

	} catch (e) {
		console.error(e);
	}
}

load();