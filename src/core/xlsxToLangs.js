const fs = require("fs");
const path = require("path");
const xlsx = require("node-xlsx");

const defaultConfig = require("../config/default");

/* 
  from:
  document.timeline, [ 'label', 'zh-CN', 'en', 'es' ], [ 'label.noRecord', '暂无时间轴记录!', 'No record yet!', '-' ]
  to:
  "document.timeline": {
    "label.noRecord": {
      "zh-CN": "暂无时间轴记录!",
      "en": "No record yet!",
      "es": "待翻译"
    }
  }
*/
function xlsxToLangs(config = defaultConfig) {
  let xlsxPath = path.join(config.sourceDir, config.xlsxname),
    stat = fs.statSync(xlsxPath),
    langs = {};

  if (stat.isFile()) {
    let worksheets = xlsx.parse(xlsxPath);
    worksheets.forEach(sheet => {
      // console.log(sheet.name, sheet.data[0], sheet.data[1]);
      let locales = sheet.data[0].slice(1);
      let localeData = {};
      let localeDataMeta = sheet.data.slice(1);

      for (let localeItemMeta of localeDataMeta) {
        let label = localeItemMeta[0];
        let localeItem = {};
        let content = localeItemMeta.slice(1);

        for (const [index, value] of locales.entries()) {
          localeItem[value] = content[index];
        }

        localeData[label] = localeItem;
      }

      langs[sheet.name] = localeData;
    });
  }

  return langs;
}

module.exports = xlsxToLangs;
