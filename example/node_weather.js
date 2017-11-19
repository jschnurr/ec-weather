const ecweather = require('../dist/ec-weather.node');

ecweather({
  lang: 'en',
  city: 'nb-23',
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2));
});

