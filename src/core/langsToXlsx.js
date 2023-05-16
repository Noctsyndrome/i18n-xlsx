const fs = require("fs");
const fse = require('fs-extra')
const path = require("path");
const xlsx = require("node-xlsx");

const defaultConfig = require("../config/default");

function langsToXlsx(langs, config = defaultConfig) {
  let sheets = [];

  for (const sheetName of Object.keys(langs)) {
    let sheet = {
      name: sheetName,
      data: []
    };
    // format sheet header
    let firstRow = ["label", ...config.langs];
    sheet.data.push(firstRow);

    // push data
    for (const label of Object.keys(langs[sheetName])) {
      let rowData = [label];
      config.langs.forEach(l => {
        if (langs[sheetName][label][l]) {
          rowData.push(langs[sheetName][label][l]);
        } else {
          rowData.push(config.defaultLabel);
        }
      });
      sheet.data.push(rowData);
    }

    sheets.push(sheet);
  }

  // format style, width only
  const options = {
    "!cols": [{ wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }]
  };

  // clear output dir
  fse.emptyDirSync(config.targetDir)

  fs.writeFileSync(
    path.join(config.targetDir, config.xlsxname),
    xlsx.build(sheets, options),
    { encoding: "utf8" }
  );
}

module.exports = langsToXlsx;
