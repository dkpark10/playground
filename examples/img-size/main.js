const unicode = require('@unicode/unicode-15.0.0/Block/Hangul_Syllables/code-points.js');
const syllables = require('@unicode/unicode-15.0.0/Block/Hangul_Syllables/symbols.js');
const range = require('@unicode/unicode-15.0.0/Block/Hangul_Syllables/regex.js');

const args = process.argv[2];

/**
 * @description 한글 유니코드 범위 /[\uAC00-\uD7AF]/ 
 * ex) 한 = D55C
 * D55C를 바이너리로 변환 1101010101011100
 * 총 길이 16비트이므로
 * 첫바이트에는 몇 바이트를 사용하는지 알려주는 비트를 먼저 넣음 utf8 변환표에 따르면 
 * 16비트는 3바이트(1110)을 사용한다.
 * 첫 바이트 1110xxxx
 * 두번째 바이트 10xxxxxx
 * 세번째 첫바이트 10xxxxxx
 * 
 * 1101 0101 0101 1100 이걸 분해하면
 * 첫바이트: 1110 + 1101
 * 두번째 바이트: 10 + 010101
 * 세번쨰 바이트: 10 + 011100
 * ed 95 9c
 */

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