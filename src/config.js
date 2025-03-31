const path = require('path');

const PORT = 4000;
const DOMAIN = "http://localhost:4000/";
const IMAGES = path.join(__dirname, '../images');
const ROOT = path.join(__dirname, '../');

module.exports = {
  DOMAIN,
  PORT,
  IMAGES,
  ROOT
};