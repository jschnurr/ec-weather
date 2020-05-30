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

describe("index (stubbed axios)", () => {
  let axiosGetStub;

  beforeEach(async () => {
    axiosGetStub = sinon.stub(axios, "get");
    axiosGetStub.resolves({
      data: await fs.readFile(path.join(__dirname, "data", "nb-23-e.xml")),
    });
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("returns rejected promise if http get rejects", () => {
    axiosGetStub.rejects();
    const weather = ecWeather();
    return expect(weather).to.be.rejected; // eslint-disable-line
  });

  it("returns default results when no options are specified", async () => {
    const weather = await ecWeather();

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/nb-23_e.xml"
    );
    expect(weather).to.deep.equal(nb23e_transformed);
  });

  it("returns results when options are fully specified", async () => {
    const options = { lang: "zo", city: "xx-99" };
    const weather = await ecWeather(options);

    expect(axiosGetStub).to.always.have.been.calledOnceWithExactly(
      "https://weather.gc.ca/rss/city/xx-99_z.xml"
    );
    expect(weather).to.deep.equal({
      ...nb23e_transformed,
      ...options,
      badgeUrl:
        "https://weather.gc.ca/wxlink/wxlink.html?cityCode=xx-99&lang=z",
    });
  });
});
