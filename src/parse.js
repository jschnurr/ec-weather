import { processors, parseStringPromise } from "xml2js";

/**
 * Parse XML into a Javascript object.
 * @param {string} xml - the xml content to be parsed.
 * @return {promise} Javascript object representation of the content.
 */

export function parse(xml) {
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
    attrValueProcessors: [processors.parseNumbers, processors.parseBooleans],
    tagNameProcessors: null,
    valueProcessors: null,
  };

  return parseStringPromise(xml, options);
}
