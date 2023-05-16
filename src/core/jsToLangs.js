const fs = require("fs");
const path = require("path");

const flatten = require("../utils/flatten");
const walkdirSync = require("../utils/walkdirSync");

const defaultConfig = require("../config/default");

function jsToLangs(config = defaultConfig) {
  let files = walkdirSync(config.sourceDir),
    langs = {};

  function formatLocaleItem() {
    return config.langs.reduce(function(result, lang) {
      result[lang] = config.defaultLabel;
      return result;
    }, {});
  }

  // filter base lang
  let baseFiles = files.filter(filePath => {
    return path.parse(filePath).name === config.baseLang;
  });

  // format langs structure
  baseFiles.forEach(filePath => {
    let fileObj = path.parse(filePath); // dir: fullpath, base: es.js, ext: .js, name: es;
    let filename = fileObj.base;

    let relPath = fileObj.dir
      .replace(config.sourceDir, "")
      .replace(/(\\|\/)/g, ".");
    if (relPath.charAt(0) === ".") relPath = relPath.substring(1);
    if (relPath === "") relPath = "root"; // ! reserved

    let stats = fs.statSync(filePath);
    if (stats.isFile()) {
      let locale = flatten(require(filePath).default);
      for (const key of Object.keys(locale)) {
        locale[key] = formatLocaleItem();
      }
      langs[relPath] = locale;
    }
  });

  // set locale
  files.forEach(filePath => {
    let fileObj = path.parse(filePath); // dir: fullpath, base: es.js, ext: .js, name: es;
    let filename = fileObj.base;
    let filelang = fileObj.name;
    if (config.langs.indexOf(filelang) < 0) return; // check valid name

    let relPath = fileObj.dir
      .replace(config.sourceDir, "")
      .replace(/(\\|\/)/g, ".");
    if (relPath.charAt(0) === ".") relPath = relPath.substring(1);
    if (relPath === "") relPath = "root"; // ! reserved

    let stats = fs.statSync(filePath);
    if (stats.isFile()) {
      let locale = flatten(require(filePath).default);
      for (const key of Object.keys(locale)) {
        if (langs[relPath][key]) {
          langs[relPath][key][filelang] = locale[key];
        }
      }
    }
  });

  return langs;
}

module.exports = jsToLangs;
