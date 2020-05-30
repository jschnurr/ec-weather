import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { promises as fs } from "fs";
import path from "path";

import { transform } from "../src/transform";

import nb23e_parsed from "./data/nb-23-e.parsed.json";
import nb23f_parsed from "./data/nb-23-f.parsed.json";
import nb23e_transformed from "./data/nb-23-e.transformed.json";
import nb23f_transformed from "./data/nb-23-f.transformed.json";

chai.use(chaiAsPromised);

describe("transform", () => {
  it("correctly transforms an object in english", async () => {
    const data = await transform("en", "nb-23", nb23e_parsed);
    expect(data).to.deep.equal(nb23e_transformed);
  });

  it("correctly transforms an object in french", async () => {
    const data = await transform("fr", "nb-23", nb23f_parsed);
    expect(data).to.deep.equal(nb23f_transformed);
  });
});
