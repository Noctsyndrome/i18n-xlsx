const fs = require("fs");

function walkdirSync(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walkdirSync(file));
    } else {
      /* Is a file */
      // var file_type = file.split(".").pop();
      // var file_name = file.split(/(\\|\/)/g).pop();
      results.push(file);
    }
  });
  return results;
}

module.exports = walkdirSync;
