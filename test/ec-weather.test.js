import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { promises as fs } from "fs";
import path from "path";

// dependencies for module under test
import axios from "axios";

// module under test
import ecWeather from "../src/index";

import nb23e_transformed from "./data/nb-23-e.transformed.json";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("live: ec-weather module", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.spy(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("returns results (nb-23_e)", async () => {
    const weather = await ecWeather({ lang: "en", city: "nb-23" });

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/nb-23_e.xml"
    );
    expect(weather.title).to.be.equal(
      "Saint John - Weather - Environment Canada"
    );
  });

  it("returns results (bc-74_f)", async () => {
    const weather = await ecWeather({ lang: "fr", city: "bc-74" });

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/bc-74_f.xml"
    );
    expect(weather.title).to.be.equal(
      "Vancouver - Météo - Environnement Canada"
    );
  });

  it("rejects bad city code (xx-99_e)", async () => {
    const weather = ecWeather({ lang: "en", city: "xx-99" });

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/xx-99_e.xml"
    );
    return expect(weather).to.be.rejected; // eslint-disable-line
  });

  it("rejects bad language (nb-23_x)", async () => {
    const weather = ecWeather({ lang: "xx", city: "nb-23" });

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/nb-23_x.xml"
    );
    return expect(weather).to.be.rejected; // eslint-disable-line
  });
});
