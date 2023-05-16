function flatten(o) {
  var prefix = arguments[1] || "",
    out = arguments[2] || {},
    name;
  for (name in o) {
    if (o.hasOwnProperty(name)) {
      typeof o[name] === "object"
        ? flatten(o[name], prefix + name + ".", out)
        : (out[prefix + name] = o[name]);
    }
  }
  return out;
}

module.exports = flatten;
