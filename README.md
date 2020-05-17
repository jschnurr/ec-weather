![CI](https://github.com/jschnurr/ec-weather/workflows/CI/badge.svg)
# ec-weather - an Environment Canada weather forecast feed in JSON

[Weather.gc.ca](http://weather.gc.ca) provides weather forecasts for 768 locations
in Canada, on the website and as atom RSS feeds. The purpose of this library is to
transform this raw feed into clean, well formatted JSON suitable for use in your
Node or Browser application.

# Installation
```bash
npm install ec-weather
```

# API
The module is called with a single options object.
```javascript
const ecweather = require('ec-weather');

var options = {
  lang: 'en',
  city: 'nb-23',
};

ecweather(options)
```
The two parameters are:
- **lang** {string} - either '*en*' or '*fr*'.  Default '*en*'.
- **city** {string} - 5 character Environment Canada city code.

Returns a promise, which resolves to the forecast as a JSON object.

## City Codes
Environment Canada uses 4-5 character city codes to identify
the location for a given forecasts.  The city code can be found by navigating to the Local
forecast, and examining the URL.

For example:
```
https://weather.gc.ca/city/pages/on-82_metric_e.html --> on-82
https://weather.gc.ca/city/pages/ns-19_metric_e.html --> ns-19
```

# Use
Sample code is available in the **examples** directory.

## Browser
Note the `axios` dependency. It must be in scope before loading `ec-weather`.

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/ec-weather/dist/ec-weather.js"></script>
<pre id="json"></pre>
<script>
ecWeather({
        lang: 'en',
        city: 'nb-23',
    })
    .then((data) => {
        document.getElementById('json').innerHTML = JSON.stringify(data, undefined, 2);
    });
</script>
```
### A note about [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
When testing in a browser, you may get the following error:
```
Failed to load https://weather.gc.ca/rss/city/nb-23_e.xml: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
This occurs if the server hosting the javascript code above does not present the *Access-Control-Allow-Origin* header, or the
value does not match your local host. During development, you can workaround the issue with the
[Cross Domain - CORS extension](https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai?hl=en)
in the Chrome Web Store.

## Node
```javascript
const ecweather = require('ec-weather');

let data = await ecweather({
  lang: 'en',
  city: 'nb-23',
})

console.log(JSON.stringify(data, undefined, 2));
```

# Sample Output
```json
{
  "lang": "en",
  "city": "nb-23",
  "title": "Saint John - Weather - Environment Canada",
  "badgeUrl": "https://weather.gc.ca/wxlink/wxlink.html?cityCode=nb-23&lang=e",
  "author": {
    "name": "Environment Canada",
    "uri": "http://www.weather.gc.ca"
  },
  "updated": "2017-11-19T19:45:14Z",
  "rights": "Copyright 2017, Environment Canada",
  "entries": [
    {
      "type": "Warnings and Watches",
      "title": "No watches or warnings in effect, Saint John",
      "link": "http://www.weather.gc.ca/warnings/index_e.html",
      "updated": "2017-11-16T09:46:00Z",
      "published": "2017-11-16T09:46:00Z",
      "summary": "No watches or warnings in effect.",
      "inEffect": false
    },
    {
      "type": "Current Conditions",
      "title": "Current Conditions: Light Rain, 13.1°C",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T19:40:00Z",
      "published": "2017-11-19T19:40:00Z",
      "summary": "Observed at: Saint John Airport 3:40 PM AST Sunday 19 November 2017 | Condition: Light Rain | Temperature: 13.1°C | Pressure / Tendency: 98.5 kPa falling | Visibility: 3.2 km | Humidity: 98 % | Dewpoint: 12.8°C | Wind: SSW 41 km/h gust 58 km/h | Air Quality Health Index: 3",
      "observedAt": "Saint John Airport 3:40 PM AST Sunday 19 November 2017",
      "condition": "Light Rain",
      "temperature": "13.1°C",
      "pressureTendency": "98.5 kPa falling",
      "visibility": "3.2 km",
      "humidity": "98 %",
      "dewpoint": "12.8°C",
      "wind": "SSW 41 km/h gust 58 km/h",
      "airQualityHealthIndex": "3"
    },
    {
      "type": "Weather Forecasts",
      "title": "Sunday: Rain. High 12.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Rain. Fog patches. Amount 20 to 30 mm. Wind south 40 km/h gusting to 70. High 12. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Sunday night: Rain. Low minus 4.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Rain ending this evening then clearing. Fog patches dissipating this evening. Amount 5 mm. Wind southwest 40 km/h gusting to 60 becoming west 30 gusting to 50 after midnight. Low minus 4. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Monday: A mix of sun and cloud. High zero.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "A mix of sun and cloud. Wind west 30 km/h gusting to 50. High zero. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Monday night: Clear. Low minus 8.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Clear. Low minus 8. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Tuesday: Cloudy. High 7.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy. High 7. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Tuesday night: Cloudy periods. Low plus 2.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy periods. Low plus 2. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Wednesday: A mix of sun and cloud. High 6.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "A mix of sun and cloud. High 6. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Wednesday night: Periods of rain. Low minus 1.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Periods of rain. Low minus 1. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Thursday: A mix of sun and cloud. High plus 1.",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "A mix of sun and cloud. High plus 1. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Thursday night: Chance of flurries. Low minus 3. POP 60%",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy with 60 percent chance of flurries. Low minus 3. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Friday: Chance of flurries or rain showers. High plus 3. POP 60%",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy with 60 percent chance of flurries or rain showers. High plus 3. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Friday night: Chance of showers. Low minus 2. POP 60%",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy with 60 percent chance of showers. Low minus 2. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    },
    {
      "type": "Weather Forecasts",
      "title": "Saturday: Chance of showers. High plus 3. POP 60%",
      "link": "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
      "updated": "2017-11-19T15:00:00Z",
      "published": "2017-11-19T15:00:00Z",
      "summary": "Cloudy with 60 percent chance of showers. High plus 3. Forecast issued 11:00 AM AST Sunday 19 November 2017"
    }
  ]
}
```

# Contributing
Updates, additional features or bug fixes are always welcome.

# License
The MIT License (MIT). See LICENCE file for details.
