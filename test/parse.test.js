import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { promises as fs } from "fs";
import path from "path";

import { parse } from "../src/parse";

import nb23e_parsed from "./data/nb-23-e.parsed.json";
import nb23f_parsed from "./data/nb-23-f.parsed.json";

chai.use(chaiAsPromised);

describe("parse", () => {
  it("parses xml into javascript object for english version", async () => {
    const xml = await fs.readFile(path.join(__dirname, "data", "nb-23-e.xml"));
    const data = await parse(xml);
    expect(data).to.deep.equal(nb23e_parsed);
  });

  it("parses xml into javascript object for french version", async () => {
    const xml = await fs.readFile(path.join(__dirname, "data", "nb-23-f.xml"));
    const data = await parse(xml);
    expect(data).to.deep.equal(nb23f_parsed);
  });

  it("rejects promise if the xml cannot be parsed", () => {
    const xml = "garbage";
    const data = parse(xml);
    expect(data).to.be.rejectedWith(
      "Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: g"
    );
  });
});
