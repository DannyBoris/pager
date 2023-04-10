import {
  __export
} from "./chunk-4EOJPDL2.js";

// node_modules/@dicebear/core/lib/utils/license.js
var license_exports = {};
__export(license_exports, {
  exif: () => exif,
  xml: () => xml2
});

// node_modules/@dicebear/core/lib/utils/escape.js
var escape_exports = {};
__export(escape_exports, {
  xml: () => xml
});
function xml(content) {
  return content.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// node_modules/@dicebear/core/lib/utils/license.js
function xml2(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
  const title = (_b = (_a = style.meta) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "Unnamed";
  const creator = (_d = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.creator) !== null && _d !== void 0 ? _d : "Unknown";
  let description = `"${title}" by "${creator}"`;
  if ((_f = (_e = style.meta) === null || _e === void 0 ? void 0 : _e.license) === null || _f === void 0 ? void 0 : _f.name) {
    description += `, licensed under "${style.meta.license.name}".`;
  }
  description += " / Remix of the original. - Created with dicebear.com";
  const xmlTitle = `<dc:title>${xml(title)}</dc:title>`;
  const xmlCreator = `<dc:creator><cc:Agent rdf:about="${xml((_h = (_g = style.meta) === null || _g === void 0 ? void 0 : _g.homepage) !== null && _h !== void 0 ? _h : "")}"><dc:title>${xml(creator)}</dc:title></cc:Agent></dc:creator>`;
  const xmlSource = ((_j = style.meta) === null || _j === void 0 ? void 0 : _j.source) ? `<dc:source>${xml(style.meta.source)}</dc:source>` : "";
  const xmlLicense = ((_l = (_k = style.meta) === null || _k === void 0 ? void 0 : _k.license) === null || _l === void 0 ? void 0 : _l.url) ? `<cc:license rdf:resource="${xml(style.meta.license.url)}" />` : "";
  return `<desc>${description}</desc><metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:RDF><cc:Work>` + xmlTitle + xmlCreator + xmlSource + xmlLicense + "</cc:Work></rdf:RDF></metadata>";
}
function exif(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  const title = (_b = (_a = style.meta) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "Unnamed";
  const creator = (_d = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.creator) !== null && _d !== void 0 ? _d : "Unknown";
  let copyright = `"${title}" by "${creator}"`;
  if ((_f = (_e = style.meta) === null || _e === void 0 ? void 0 : _e.license) === null || _f === void 0 ? void 0 : _f.name) {
    copyright += `, licensed under "${style.meta.license.name}".`;
  }
  copyright += " / Remix of the original.";
  const exif2 = {
    ImageDescription: `${copyright} - Created with dicebear.com`,
    Copyright: copyright,
    "XMP-dc:Title": title,
    "XMP-dc:Creator": creator
  };
  if ((_g = style.meta) === null || _g === void 0 ? void 0 : _g.source) {
    exif2["XMP-dc:Source"] = style.meta.source;
  }
  if ((_j = (_h = style.meta) === null || _h === void 0 ? void 0 : _h.license) === null || _j === void 0 ? void 0 : _j.url) {
    exif2["XMP-cc:License"] = style.meta.license.url;
  }
  return exif2;
}

// node_modules/@dicebear/core/lib/utils/prng.js
var MIN = -2147483648;
var MAX = 2147483647;
function xorshift(value) {
  value ^= value << 13;
  value ^= value >> 17;
  value ^= value << 5;
  return value;
}
function hashSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
    hash = xorshift(hash);
  }
  return hash;
}
function create(seed = "") {
  seed = seed.toString();
  let value = hashSeed(seed) || 1;
  const next = () => value = xorshift(value);
  const integer = (min, max) => {
    return Math.floor((next() - MIN) / (MAX - MIN) * (max + 1 - min) + min);
  };
  return {
    seed,
    next,
    bool(likelihood = 50) {
      return integer(0, 100) <= likelihood;
    },
    integer(min, max) {
      return integer(min, max);
    },
    pick(arr, fallback) {
      var _a;
      if (arr.length === 0) {
        next();
        return fallback;
      }
      return (_a = arr[integer(0, arr.length - 1)]) !== null && _a !== void 0 ? _a : fallback;
    },
    shuffle(arr) {
      const internalPrng = create(next().toString());
      return arr.sort(() => internalPrng.integer(-1, 1));
    },
    string(length, characters = "abcdefghijklmnopqrstuvwxyz1234567890") {
      const internalPrng = create(next().toString());
      let str = "";
      for (let i = 0; i < length; i++) {
        str += characters[internalPrng.integer(0, characters.length - 1)];
      }
      return str;
    }
  };
}

// node_modules/@dicebear/core/lib/utils/svg.js
function getViewBox(result) {
  let viewBox = result.attributes["viewBox"].split(" ");
  let x = parseInt(viewBox[0]);
  let y = parseInt(viewBox[1]);
  let width = parseInt(viewBox[2]);
  let height = parseInt(viewBox[3]);
  return {
    x,
    y,
    width,
    height
  };
}
function addBackground(result, primaryColor, secondaryColor, type, rotation) {
  let { width, height, x, y } = getViewBox(result);
  const solidBackground = `<rect fill="${primaryColor}" width="${width}" height="${height}" x="${x}" y="${y}" />`;
  switch (type) {
    case "solid":
      return solidBackground + result.body;
    case "gradientLinear":
      return `<rect fill="url(#backgroundLinear)" width="${width}" height="${height}" x="${x}" y="${y}" /><defs><linearGradient id="backgroundLinear" gradientTransform="rotate(${rotation} 0.5 0.5)"><stop stop-color="${primaryColor}"/><stop offset="1" stop-color="${secondaryColor}"/></linearGradient></defs>` + result.body;
  }
}
function addScale(result, scale) {
  let { width, height, x, y } = getViewBox(result);
  let percent = scale ? (scale - 100) / 100 : 0;
  let translateX = (width / 2 + x) * percent * -1;
  let translateY = (height / 2 + y) * percent * -1;
  return `<g transform="translate(${translateX} ${translateY}) scale(${scale / 100})">${result.body}</g>`;
}
function addTranslate(result, x, y) {
  let viewBox = getViewBox(result);
  let translateX = (viewBox.width + viewBox.x * 2) * ((x !== null && x !== void 0 ? x : 0) / 100);
  let translateY = (viewBox.height + viewBox.y * 2) * ((y !== null && y !== void 0 ? y : 0) / 100);
  return `<g transform="translate(${translateX} ${translateY})">${result.body}</g>`;
}
function addRotate(result, rotate) {
  let { width, height, x, y } = getViewBox(result);
  return `<g transform="rotate(${rotate}, ${width / 2 + x}, ${height / 2 + y})">${result.body}</g>`;
}
function addFlip(result) {
  let { width, x } = getViewBox(result);
  return `<g transform="scale(-1 1) translate(${width * -1 - x * 2} 0)">${result.body}</g>`;
}
function addViewboxMask(result, radius) {
  let { width, height, x, y } = getViewBox(result);
  let rx = radius ? width * radius / 100 : 0;
  let ry = radius ? height * radius / 100 : 0;
  return `<mask id="viewboxMask"><rect width="${width}" height="${height}" rx="${rx}" ry="${ry}" x="${x}" y="${y}" fill="#fff" /></mask><g mask="url(#viewboxMask)">${result.body}</g>`;
}
function createAttrString(result) {
  const attributes = {
    xmlns: "http://www.w3.org/2000/svg",
    ...result.attributes
  };
  return Object.keys(attributes).map((attr) => `${xml(attr)}="${xml(attributes[attr])}"`).join(" ");
}
function randomizeIds(result) {
  const prng = create();
  const ids = {};
  return result.body.replace(/(id="|url\(#)([a-z0-9-_]+)([")])/gi, (match, m1, m2, m3) => {
    ids[m2] = ids[m2] || prng.string(8);
    return `${m1}${ids[m2]}${m3}`;
  });
}

// node_modules/@dicebear/core/lib/schema.js
var schema = {
  type: "object",
  $schema: "http://json-schema.org/draft-07/schema#",
  properties: {
    seed: {
      type: "string"
    },
    flip: {
      type: "boolean",
      default: false
    },
    rotate: {
      type: "integer",
      minimum: 0,
      maximum: 360,
      default: 0
    },
    scale: {
      type: "integer",
      minimum: 0,
      maximum: 200,
      default: 100
    },
    radius: {
      type: "integer",
      minimum: 0,
      maximum: 50,
      default: 0
    },
    size: {
      type: "integer",
      minimum: 1
    },
    backgroundColor: {
      type: "array",
      items: {
        type: "string",
        pattern: "^(transparent|[a-fA-F0-9]{6})$"
      }
    },
    backgroundType: {
      type: "array",
      items: {
        type: "string",
        enum: ["solid", "gradientLinear"]
      },
      default: ["solid"]
    },
    backgroundRotation: {
      type: "array",
      items: {
        type: "integer",
        minimum: -360,
        maximum: 360
      },
      default: [
        0,
        360
      ]
    },
    translateX: {
      type: "integer",
      minimum: -100,
      maximum: 100,
      default: 0
    },
    translateY: {
      type: "integer",
      minimum: -100,
      maximum: 100,
      default: 0
    },
    clip: {
      type: "boolean",
      default: true
    },
    randomizeIds: {
      type: "boolean",
      default: false
    }
  }
};

// node_modules/@dicebear/core/lib/utils/options.js
function defaults(schema2) {
  var _a;
  let result = {};
  let props = (_a = schema2.properties) !== null && _a !== void 0 ? _a : {};
  Object.keys(props).forEach((key) => {
    let val = props[key];
    if (typeof val === "object" && void 0 !== val.default) {
      if (Array.isArray(val.default)) {
        result[key] = [...val.default];
      } else if (typeof val.default === "object") {
        result[key] = { ...val.default };
      } else {
        result[key] = val.default;
      }
    }
  });
  return result;
}
function merge(style, options) {
  var _a;
  let result = {
    ...defaults(schema),
    ...defaults((_a = style.schema) !== null && _a !== void 0 ? _a : {}),
    ...options
  };
  return JSON.parse(JSON.stringify(result));
}

// node_modules/@dicebear/converter/lib/utils/mime-type.js
function getMimeType(format) {
  switch (format) {
    case "svg":
      return "image/svg+xml";
    case "png":
    case "jpeg":
      return `image/${format}`;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

// node_modules/@dicebear/converter/lib/utils/svg.js
function ensureSize(svg, defaultSize = 512) {
  let size = defaultSize;
  svg = svg.replace(/<svg([^>]*)/, (match, g1) => {
    const found = g1.match(/width="([^"]+)"/);
    if (found) {
      size = parseInt(found[1]);
    }
    if (g1.match(/width="([^"]+)"/)) {
      g1 = g1.replace(/width="([^"]+)"/, `width="${size}"`);
    } else {
      g1 += ` width="${size}"`;
    }
    if (g1.match(/height="([^"]+)"/)) {
      g1 = g1.replace(/height="([^"]+)"/, `height="${size}"`);
    } else {
      g1 += ` height="${size}"`;
    }
    return `<svg${g1}`;
  });
  return { svg, size };
}

// node_modules/@dicebear/converter/lib/utils/text.js
var encoder;
function getEncoder() {
  if (!encoder) {
    encoder = new TextEncoder();
  }
  return encoder;
}

// node_modules/@dicebear/converter/lib/core.js
var toFormat = function(svg, format, exif2) {
  return {
    toDataUri: () => toDataUri(svg, format, exif2),
    toFile: (name) => toFile(name, svg, format, exif2),
    toArrayBuffer: () => toArrayBuffer(svg, format, exif2)
  };
};
async function toDataUri(svg, format, exif2) {
  if ("svg" === format) {
    return `data:${getMimeType(format)};utf8,${encodeURIComponent(svg)}`;
  }
  const canvas = await toCanvas(svg, format, exif2);
  return canvas.toDataURL(getMimeType(format));
}
async function toArrayBuffer(rawSvg, format, exif2) {
  if ("svg" === format) {
    return getEncoder().encode(rawSvg);
  }
  const canvas = await toCanvas(rawSvg, format, exif2);
  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      blob ? resolve(blob.arrayBuffer()) : reject(new Error("Could not create blob"));
    }, getMimeType(format));
  });
}
async function toFile(name, svg, format, exif2) {
  const link = document.createElement("a");
  link.href = await toDataUri(svg, format, exif2);
  link.download = name;
  link.click();
  link.remove();
}
async function toCanvas(rawSvg, format, exif2) {
  if (exif2) {
    console.warn("The `exif` option is not supported in the browser version of `@dicebear/converter`. \nPlease use the node version of `@dicebear/converter` to generate images with exif data.");
  }
  let { svg, size } = ensureSize(rawSvg);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (null === context) {
    throw new Error("Could not get canvas context");
  }
  if (format === "jpeg") {
    context.fillStyle = "white";
    context.fillRect(0, 0, size, size);
  }
  var img = document.createElement("img");
  img.width = size;
  img.height = size;
  img.setAttribute("src", await toDataUri(svg, "svg"));
  return new Promise((resolve, reject) => {
    img.onload = () => {
      context.drawImage(img, 0, 0, size, size);
      resolve(canvas);
    };
    img.onerror = (e) => reject(e);
  });
}

// node_modules/@dicebear/core/lib/utils/color.js
function convertColor(color) {
  return "transparent" === color ? color : `#${color}`;
}
function getBackgroundColors(prng, backgroundColor) {
  var _a;
  let shuffledBackgroundColors;
  if (backgroundColor.length <= 2) {
    prng.next();
    shuffledBackgroundColors = backgroundColor;
  } else {
    shuffledBackgroundColors = prng.shuffle(backgroundColor);
  }
  if (shuffledBackgroundColors.length === 0) {
    shuffledBackgroundColors = ["transparent"];
  }
  const primary = shuffledBackgroundColors[0];
  const secondary = (_a = shuffledBackgroundColors[1]) !== null && _a !== void 0 ? _a : shuffledBackgroundColors[0];
  return {
    primary: convertColor(primary),
    secondary: convertColor(secondary)
  };
}

// node_modules/@dicebear/core/lib/core.js
function createAvatar(style, options = {}) {
  var _a, _b, _c, _d, _e;
  options = merge(style, options);
  const prng = create(options.seed);
  const result = style.create({ prng, options });
  const { primary: primaryBackgroundColor, secondary: secondaryBackgroundColor } = getBackgroundColors(prng, (_a = options.backgroundColor) !== null && _a !== void 0 ? _a : []);
  const backgroundType = prng.pick((_b = options.backgroundType) !== null && _b !== void 0 ? _b : [], "solid");
  const backgroundRotation = prng.integer(((_c = options.backgroundRotation) === null || _c === void 0 ? void 0 : _c.length) ? Math.min(...options.backgroundRotation) : 0, ((_d = options.backgroundRotation) === null || _d === void 0 ? void 0 : _d.length) ? Math.max(...options.backgroundRotation) : 0);
  if (options.size) {
    result.attributes.width = options.size.toString();
    result.attributes.height = options.size.toString();
  }
  if (options.scale !== void 0 && options.scale !== 100) {
    result.body = addScale(result, options.scale);
  }
  if (options.flip) {
    result.body = addFlip(result);
  }
  if (options.rotate) {
    result.body = addRotate(result, options.rotate);
  }
  if (options.translateX || options.translateY) {
    result.body = addTranslate(result, options.translateX, options.translateY);
  }
  if (primaryBackgroundColor !== "transparent" && secondaryBackgroundColor !== "transparent") {
    result.body = addBackground(result, primaryBackgroundColor, secondaryBackgroundColor, backgroundType, backgroundRotation);
  }
  if (options.radius || options.clip) {
    result.body = addViewboxMask(result, (_e = options.radius) !== null && _e !== void 0 ? _e : 0);
  }
  if (options.randomizeIds) {
    result.body = randomizeIds(result);
  }
  const attributes = createAttrString(result);
  const metadata = xml2(style);
  const exif2 = exif(style);
  const svg = `<svg ${attributes}>${metadata}${result.body}</svg>`;
  return {
    toString: () => svg,
    toJson: () => {
      var _a2;
      return {
        svg,
        extra: {
          primaryBackgroundColor,
          secondaryBackgroundColor,
          backgroundType,
          backgroundRotation,
          ...(_a2 = result.extra) === null || _a2 === void 0 ? void 0 : _a2.call(result)
        }
      };
    },
    toDataUriSync: () => {
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    },
    ...toFormat(svg, "svg"),
    png: ({ includeExif = false } = {}) => {
      return toFormat(svg, "png", includeExif ? exif2 : void 0);
    },
    jpeg: ({ includeExif = false } = {}) => {
      return toFormat(svg, "jpeg", includeExif ? exif2 : void 0);
    }
  };
}

export {
  escape_exports,
  license_exports,
  schema,
  createAvatar
};
/*! Bundled license information:

@dicebear/converter/lib/index.js:
  (*!
   * DiceBear Converter (@dicebear/converter)
   *
   * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/main/LICENSE)
   * Copyright (c) 2023 Florian Körner
   *)

@dicebear/core/lib/index.js:
  (*!
   * DiceBear (@dicebear/core)
   *
   * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/main/LICENSE)
   * Copyright (c) 2023 Florian Körner
   *)
*/
//# sourceMappingURL=chunk-UIKQWAX3.js.map
