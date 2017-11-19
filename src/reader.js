/* eslint-disable func-names */
import { processors, parseString } from 'xml2js';

/**
 * Parse XML into a Javascript object.
 * @param {string} xml - the xml content to be parsed.
 * @return {promise} Javascript object representation of the content.
 */

export default function (xml) {
  const options = {
    trim: true,
    normalizeTags: false,
    explicitArray: false,
    ignoreAttrs: false,
    mergeAttrs: true,
    validator: null,
    includeWhiteChars: true,
    async: true,
    strict: true,
    attrNameProcessors: null,
    attrValueProcessors: [
      processors.parseNumbers,
      processors.parseBooleans,
    ],
    tagNameProcessors: null,
    valueProcessors: null,
  };

  return new Promise((resolve, reject) => {
    parseString(xml, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
