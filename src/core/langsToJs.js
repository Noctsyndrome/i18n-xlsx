const fs = require("fs");
const fse = require('fs-extra')
const path = require("path");

const flatten = require("../utils/flatten");
const setDeep = require("../utils/setDeep");

const defaultConfig = require("../config/default");

function langsToJs(langs, config = defaultConfig) {
  // clear output dir
  fse.emptyDirSync(config.targetDir)

  for (const sheetName of Object.keys(langs)) {
    // create dir
    let relPath = sheetName === "root" ? "" : sheetName.replace(".", "/");
    let dirPath = config.targetDir + "/" + relPath;
    fse.ensureDirSync(dirPath);

    // format object
    let fileObj = {};
    for (let [label, localeItem] of Object.entries(langs[sheetName])) {
      for (const locale of Object.keys(localeItem)) {
        if (!fileObj[locale]) fileObj[locale] = {};
        setDeep(fileObj[locale], label, localeItem[locale]);
      }
    }

    // TODO: format refine
    function interatorObj2Str(obj, format = true) {
      let keys = Object.keys(obj),
        result = "{" + (format ? "\n" : "");

      keys.forEach((key, index) => {
        if (typeof obj[key] === "object") {
          result +=
            (index > 0 ? "," : "") +
            (format && index > 0 ? "\n" : "") +
            (format ? `  ` : "") +
            key +
            ":" +
            interatorObj2Str(obj[key], format);
        } else {
          result +=
            (index > 0 ? "," : "") +
            (format && index > 0 ? "\n" : "") +
            (format ? `  ` : "") +
            key +
            ":`" +
            obj[key] +
            "`";
        }
      });
      result += (format ? "\n     " : "") + "}";
      return result;
    }

    // restore js
    for (const locale of Object.keys(fileObj)) {
      fs.writeFileSync(
        path.join(dirPath, locale + ".js"),
        "export default " + JSON.stringify(fileObj[locale], null, 2)
        // "export default " + interatorObj2Str(fileObj[locale])
      );
    }  
  }
}

module.exports = langsToJs;