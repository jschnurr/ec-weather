const ecweather = require("ec-weather");

(async () => {
  let data = await ecweather({
    lang: "en",
    city: "nb-23",
  });

  console.log(JSON.stringify(data, undefined, 2));
})();
