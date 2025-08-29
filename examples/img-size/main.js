const unicode = require('@unicode/unicode-15.0.0/Block/Hangul_Syllables/code-points.js');
const syllables = require('@unicode/unicode-15.0.0/Block/Hangul_Syllables/symbols.js');

const args = process.argv[2];

/** @param {number} arg */
function convertToHex(arg) {
  return arg.toString(16);
}

/** @param {string} hex */
function hexToBinary(hex) {
  return parseInt(hex, 16).toString(2);
}

/** @param {string} hex */
function binaryToHex(bin) {
  return parseInt(bin, 2).toString(16).toLocaleLowerCase();
}

/** @param {string} binary */
function convertUTF8(binary) {
  return [
    binaryToHex('1110' + binary.slice(0, 4)),
    binaryToHex('10' + binary.slice(4, 10)),
    binaryToHex('10' + binary.slice(10)),
  ].join('');
}

const reuslt = args
  .split("")
  .map((item) => syllables.findIndex((item2) => item2 === item))
  .map((uniCodeIdx) => convertToHex(unicode[uniCodeIdx]))
  .map((hex) => hexToBinary(hex))
  .map((binary) => convertUTF8(binary))

console.log(reuslt);