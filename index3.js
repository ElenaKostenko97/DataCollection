
const axios = require("axios");
const cheerio = require("cheerio");
//import { concat, range } from "lodash";
const concat = require("lodash/concat");
const range = require("lodash/range");


const tasks = { title: "tws", url: "https://www.farpost.ru/vladivostok/realty/rent_flats/" };

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
				const url = $(el).find("a").attr("href");
				return { id, url };
			}).get();

		});
		const datas = concat(...mapId);

		console.log(mapId);

		//await destroyAdsId(tasks[0].title);
		//await saveAdIds(tasks[0].title, datas);

		// const { dataValues } = await fetchAdIds(tasks[0].title);


	} catch (e) {
		console.error(e);
	}
}

load();