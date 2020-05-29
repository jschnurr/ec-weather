/* eslint-disable no-undef, prefer-destructuring, no-unused-vars, no-underscore-dangle */
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import ecWeather from "../src/index";

chai.use(chaiAsPromised);

describe("ec-weather module", () => {
  it("returns default results when no options are specified", async () => {
    const weather = await ecWeather();

    expect(weather).to.be.an("object");
    expect(weather.title).to.equal("Saint John - Weather - Environment Canada");
  });

  it("returns rejected promise if city code doesn't exist", () => {
    const weather = ecWeather({ city: "nn-23" });
    return expect(weather).to.be.rejected; // eslint-disable-line
  });

  it("returns results when options are fully specified", async () => {
    const weather = await ecWeather({ lang: "en", city: "on-81" });

    expect(weather).to.be.an("object");
    expect(weather.title).to.equal("Cambridge - Weather - Environment Canada");
  });
});
