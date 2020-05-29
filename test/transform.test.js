/* eslint-disable no-undef, prefer-destructuring, no-unused-vars, no-underscore-dangle */
import { transform } from "../src/transform";

const chai = require("chai");
const expect = require("chai").expect;
const fs = require("fs").promises;
const path = require("path");

describe("transform module", () => {
  it("correctly transforms an object in english", async () => {
    const obj = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-e.json"))
    );
    const data = await transform("en", "nb-23", obj);

    expect(data).to.be.an("object");
    expect(data).to.deep.equal({
      lang: "en",
      city: "nb-23",
      title: "Saint John - Weather - Environment Canada",
      badgeUrl:
        "https://weather.gc.ca/wxlink/wxlink.html?cityCode=nb-23&lang=e",
      author: {
        name: "Environment Canada",
        uri: "http://www.weather.gc.ca",
      },
      updated: "2017-07-01T18:27:07Z",
      rights: "Copyright 2017, Environment Canada",
      entries: [
        {
          type: "Warnings and Watches",
          title: "No watches or warnings in effect, Saint John",
          link: "http://www.weather.gc.ca/warnings/index_e.html",
          updated: "2017-06-24T09:02:00Z",
          published: "2017-06-24T09:02:00Z",
          summary: "No watches or warnings in effect.",
          inEffect: false,
        },
        {
          type: "Current Conditions",
          title: "Current Conditions: Light Drizzle, 14.8°C",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T18:00:00Z",
          published: "2017-07-01T18:00:00Z",
          summary:
            "Observed at: Saint John Airport 3:00 PM ADT Saturday 01 July 2017 | Condition: Light Drizzle | Temperature: 14.8°C | Pressure / Tendency: 101.6 kPa steady | Visibility: 3.2 km | Humidity: 100 % | Dewpoint: 14.8°C | Wind: E 16 km/h | Air Quality Health Index: 1",
          observedAt: "Saint John Airport 3:00 PM ADT Saturday 01 July 2017",
          condition: "Light Drizzle",
          temperature: "14.8°C",
          pressureTendency: "101.6 kPa steady",
          visibility: "3.2 km",
          humidity: "100 %",
          dewpoint: "14.8°C",
          wind: "E 16 km/h",
          airQualityHealthIndex: "1",
        },
        {
          type: "Weather Forecasts",
          title: "Saturday: Chance of showers or drizzle. High 16. POP 60%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 60 percent chance of showers or drizzle. Fog patches along the coast. Wind south 20 km/h. High 16. UV index 4 or moderate. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title:
            "Saturday night: Chance of showers or drizzle. Low 13. POP 60%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 60 percent chance of showers or drizzle this evening and after midnight. Showers beginning overnight. Risk of a thundershower overnight. Fog spreading inland this evening. Amount 10 mm in the heaviest showers. Wind becoming southwest 20 km/h overnight. Low 13. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Sunday: Showers. High 18 except 24 inland.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Showers ending in the morning then a mix of sun and cloud. Risk of a thundershower in the morning. Fog retreating to the coast in the morning. Wind southwest 20 km/h. High 18 except 24 inland. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Sunday night: Cloudy periods. Low 12.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy periods. Low 12. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Monday: Chance of showers. High 22. POP 30%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 30 percent chance of showers. High 22. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Monday night: Cloudy. Low 11.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy. Low 11. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Tuesday: Chance of showers. High 22. POP 30%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 30 percent chance of showers. High 22. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Tuesday night: Chance of showers. Low 13. POP 30%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 30 percent chance of showers. Low 13. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Wednesday: A mix of sun and cloud. High 23.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "A mix of sun and cloud. High 23. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Wednesday night: Cloudy periods. Low 10.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy periods. Low 10. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Thursday: A mix of sun and cloud. High 24.",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "A mix of sun and cloud. High 24. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Thursday night: Chance of showers. Low 11. POP 30%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy periods with 30 percent chance of showers. Low 11. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
        {
          type: "Weather Forecasts",
          title: "Friday: Chance of showers. High 20. POP 60%",
          link: "http://www.weather.gc.ca/city/pages/nb-23_metric_e.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Cloudy with 60 percent chance of showers. High 20. Forecast issued 11:00 AM ADT Saturday 01 July 2017",
        },
      ],
    });
  });

  it("correctly transforms an object in french", async () => {
    const obj = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-f.json"))
    );
    const data = await transform("fr", "nb-23", obj);

    expect(data).to.be.an("object");
    expect(data).to.deep.equal({
      lang: "fr",
      city: "nb-23",
      title: "Saint John - Météo - Environnement Canada",
      badgeUrl:
        "https://weather.gc.ca/wxlink/wxlink.html?cityCode=nb-23&lang=f",
      author: {
        name: "Environnement Canada",
        uri: "http://www.meteo.gc.ca",
      },
      updated: "2017-07-01T18:28:23Z",
      rights: "Droit d'auteur 2017, Environnement Canada",
      entries: [
        {
          type: "Veilles et avertissements",
          title: "Aucune veille ou alerte en vigueur, Saint John",
          link: "http://www.meteo.gc.ca/warnings/index_f.html",
          updated: "2017-06-24T09:04:00Z",
          published: "2017-06-24T09:04:00Z",
          summary: "Aucune veille ou alerte en vigueur.",
          inEffect: false,
        },
        {
          type: "Conditions actuelles",
          title: "Conditions actuelles: Bruine faible, 14,8°C",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T18:00:00Z",
          published: "2017-07-01T18:00:00Z",
          summary:
            "Enregistrées à: Aéroport de Saint John 15h00 HAA samedi 01 juillet 2017 | Condition: Bruine faible | Température: 14,8°C | Pression / Tendance: 101,6 kPa stationnaire | Visibilité: 3,2 km | Humidité: 100 % | Point de rosée: 14,8°C | Vent: E 16 km/h | Cote air santé: 1",
          enregistréesÀ:
            "Aéroport de Saint John 15h00 HAA samedi 01 juillet 2017",
          condition: "Bruine faible",
          température: "14,8°C",
          pressionTendance: "101,6 kPa stationnaire",
          visibilité: "3,2 km",
          humidité: "100 %",
          pointDeRosée: "14,8°C",
          vent: "E 16 km/h",
          coteAirSanté: "1",
        },
        {
          type: "Prévisions météo",
          title: "Samedi: Possibilité d'averses ou bruine. Maximum 16. PdP 60%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 60 pour cent de probabilité d'averses ou de bruine. Nappes de brouillard le long de la côte. Vents du sud de 20 km/h. Maximum 16. Indice UV de 4 ou modéré. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title:
            "Ce soir et cette nuit: Possibilité d'averses ou bruine. Minimum 13. PdP 60%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 60 pour cent de probabilité d'averses ou de bruine ce soir et après minuit. Averses débutant au cours de la nuit. Risque d'un orage au cours de la nuit. Brouillard se déplaçant vers l'intérieur ce soir. Hauteur prévue de 10 mm dans les plus fortes averses. Vents devenant du sud-ouest à 20 km/h au cours de la nuit. Minimum 13. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title:
            "Dimanche: Averses. Maximum 18 sauf 24 à l'intérieur des terres.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Averses cessant le matin. Alternance de soleil et de nuages par la suite. Risque d'un orage le matin. Brouillard se retirant vers la côte le matin. Vents du sud-ouest de 20 km/h. Maximum 18 sauf 24 à l'intérieur des terres. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Dimanche soir et nuit: Passages nuageux. Minimum 12.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Passages nuageux. Minimum 12. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Lundi: Possibilité d'averses. Maximum 22. PdP 30%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 30 pour cent de probabilité d'averses. Maximum 22. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Lundi soir et nuit: Nuageux. Minimum 11.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux. Minimum 11. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Mardi: Possibilité d'averses. Maximum 22. PdP 30%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 30 pour cent de probabilité d'averses. Maximum 22. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title:
            "Mardi soir et nuit: Possibilité d'averses. Minimum 13. PdP 30%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 30 pour cent de probabilité d'averses. Minimum 13. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Mercredi: Alternance de soleil et de nuages. Maximum 23.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Alternance de soleil et de nuages. Maximum 23. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Mercredi soir et nuit: Passages nuageux. Minimum 10.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Passages nuageux. Minimum 10. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Jeudi: Alternance de soleil et de nuages. Maximum 24.",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Alternance de soleil et de nuages. Maximum 24. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title:
            "Jeudi soir et nuit: Possibilité d'averses. Minimum 11. PdP 30%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Passages nuageux avec 30 pour cent de probabilité d'averses. Minimum 11. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
        {
          type: "Prévisions météo",
          title: "Vendredi: Possibilité d'averses. Maximum 20. PdP 60%",
          link: "http://www.meteo.gc.ca/city/pages/nb-23_metric_f.html",
          updated: "2017-07-01T14:00:00Z",
          published: "2017-07-01T14:00:00Z",
          summary:
            "Nuageux avec 60 pour cent de probabilité d'averses. Maximum 20. Prévisions émises 11h00 HAA samedi 01 juillet 2017",
        },
      ],
    });
  });
});
