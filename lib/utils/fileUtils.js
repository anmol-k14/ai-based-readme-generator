const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify fs functions
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  readdir,
  readFile,
  stat,
  writeFile
};