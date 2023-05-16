const fs = require("fs");

// core func
const jsToLangs = require("./core/jsToLangs");
const langsToJs = require("./core/langsToJs");
const xlsxToLangs = require("./core/xlsxToLangs");
const langsToXlsx = require("./core/langsToXlsx");

// case
// js to xlsx
const toXlsx = () => { langsToXlsx(jsToLangs()); }
// xlsx to js
const toJs = () => { langsToJs(xlsxToLangs()); }

// test
const test = () => {
  langsToXlsx(jsToLangs());
  // langsToJs(xlsxToLangs());
  // fs.writeFileSync("./temp/langsFromJs.json", JSON.stringify(jsToLangs(), null, 2)); // inspect langs from js
  // fs.writeFileSync("./temp/langsFromXlsx.json", JSON.stringify(xlsxToLangs(), null, 2)); // inspect langs from xlsx
}

module.exports = {
  toXlsx,
  toJs,
  test
}
