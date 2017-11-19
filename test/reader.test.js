/* eslint-disable no-undef, prefer-destructuring, no-unused-vars, no-underscore-dangle */
import reader from '../src/reader';

const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const fs = require('fs');
const path = require('path');


describe('reader module', () => {
  it('parses xml into javascript object for english version', async () => {
    const xml = fs.readFileSync(path.join(__dirname, 'data', 'nb-23-e.xml'));
    const data = await reader(xml);

    expect(data).to.be.an('object');
    expect(data.feed.title).to.equal('Saint John - Weather - Environment Canada');
  });

  it('parses xml into javascript object for french version', async () => {
    const xml = fs.readFileSync(path.join(__dirname, 'data', 'nb-23-f.xml'));
    const data = await reader(xml);

    expect(data).to.be.an('object');
    expect(data.feed.title).to.equal('Saint John - Météo - Environnement Canada');
  });

  it('rejects promise if the xml cannot be parsed', () => {
    const xml = 'garbage';
    const data = reader(xml);

    expect(data).to.be.rejectedWith('Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: g');
  });
});
