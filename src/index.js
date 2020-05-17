import { parse } from "./parse.js";
import { transform } from "./transform.js";
import axios from "axios";

/**
 * Retrieve forecast for specified city / language and return parsed result.
 * @param {object} options - two optional parameters:
 *      lang {string} - either 'en' or 'fr'.  Default 'en'.
 *      city {string} - 5 character Environment Canada city code.  Default 'nb-23' (St. John, NB)
 * @return {promise} Javascript object containing the parsed city weather forecast.
 */

export default async function ecWeather(options = {}) {
  // default options
  const city = options.city || "nb-23";
  const lang = options.lang || "en";

  // get the raw XML from the RSS feed
  const url = `https://weather.gc.ca/rss/city/${city.toLowerCase()}_${lang
    .slice(0, 1)
    .toLowerCase()}.xml`;

  try {
    let data = await axios.get(url);

    // convert to JSON
    data = await parse(data.data);

    // apply transformations
    data = transform(lang, city, data);

    // return result
    return data;
  } catch (error) {
    throw new Error(`Error processing ${url}. ${error}`);
  }
}
