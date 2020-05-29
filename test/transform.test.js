/* eslint-disable no-undef, prefer-destructuring, no-unused-vars, no-underscore-dangle */
import { transform } from "../src/transform";

const chai = require("chai");
const expect = require("chai").expect;
const fs = require("fs").promises;
const path = require("path");

describe("transform module", () => {
  it("correctly transforms an object in english", async () => {
    const input = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-e.parsed.json"))
    );
    const expected = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-e.transformed.json"))
    );

    const data = await transform("en", "nb-23", input);

    expect(data).to.be.an("object");
    expect(data).to.deep.equal(expected);
  });

  it("correctly transforms an object in french", async () => {
    const obj = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-f.parsed.json"))
    );
    const expected = JSON.parse(
      await fs.readFile(path.join(__dirname, "data", "nb-23-f.transformed.json"))
    );

    const data = await transform("fr", "nb-23", obj);

    expect(data).to.be.an("object");
    expect(data).to.deep.equal(expected);
  });
});
