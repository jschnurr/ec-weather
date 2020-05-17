import { fromString } from "html-to-text/lib/html-to-text";
import camelCase from "camel-case";

/** * Builder for watches and warnings
 * - add a boolean to indicate whether a warning or watch is currently in effect.
 */
function wwBuilder(item) {
  const newItem = Object.assign({}, item);

  newItem.inEffect =
    item.title.indexOf("No watches or warnings in effect") === -1 &&
    item.title.indexOf("Aucune veille ou alerte en vigueur") === -1;
  return newItem;
}

/** * Builder for current conditions
 * - parse summary and add key/value pair to the object for every measurement found.
 */
function ccBuilder(item) {
  const newItem = Object.assign({}, item);
  const readings = item.summary.split("\n");

  readings.forEach((reading) => {
    const parts = reading.split(/:(.+)/);
    const key = camelCase(parts[0].trim().replace("/", "_"));
    const val = parts[1].trim();

    newItem[key] = val;
  });

  newItem.summary = item.summary.replace(new RegExp("\\s?\\n", "gm"), " | ");

  return newItem;
}

/** * Builder for weather forecasts
 */
function wfBuilder(item) {
  return Object.assign({}, item);
}

/** * Build Environment Canada city forecast badge URL
 */
function makeBadgeUrl(lang, city) {
  return `https://weather.gc.ca/wxlink/wxlink.html?cityCode=${city.toLowerCase()}&lang=${lang
    .slice(0, 1)
    .toLowerCase()}`;
}

/**
 * Apply section-specific data transformations and return the fully
 * assembled, transformed object.
 *
 * @param {String} lang - 2 character language code either 'en' or 'fr'
 * @param {String} city - 5 character city code i.e. nb-23
 * @param {object} feed - the object representation of the XML feed
 * @return {Object} Transformed version of the data
 */
export function transform(lang, city, feed) {
  const data = feed.feed;

  let entries = [];
  for (const item of data.entry) {
    const obj = {
      type: item.category.term,
      title: item.title,
      link: item.link.href,
      updated: item.updated,
      published: item.published,
      summary: fromString(item.summary._, { wordwrap: null }),
    };

    switch (obj.type) {
      case "Warnings and Watches":
      case "Veilles et avertissements":
        entries.push(wwBuilder(obj));
        break;

      case "Current Conditions":
      case "Conditions actuelles":
        entries.push(ccBuilder(obj));
        break;

      case "Weather Forecasts":
      case "Prévisions météo":
        entries.push(wfBuilder(obj));
        break;

      default:
        throw Error(`Unrecognized category ${obj.type}.`);
    }
  }

  return {
    // metadata
    lang,
    city,
    title: data.title,
    badgeUrl: makeBadgeUrl(lang, city),
    author: data.author,
    updated: data.updated,
    rights: data.rights,

    // each entry has the same template, plus type-specific processing
    entries: entries,
  };
}
