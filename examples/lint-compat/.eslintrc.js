const getClientFileList = require('./get-client-files');

const clientFileList = getClientFileList().map(
  /** @param {string} clientFile @returns {string} */
  (clientFile) => clientFile[0] === '/' ? clientFile.slice(1) : clientFile)

console.log(clientFileList);

module.exports =
{
  "root": true,
  // lint는 js만 해석 가능하기에 ts를 트랜스파일할 Parser가 필요
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname, // tsconfig 파일을 현재 경로에서 찾도록 함
  },
  "ignorePatterns": [".eslintrc.js", "get-client-files.js"],
  "overrides": [
    {
      "files": [...clientFileList],
      "plugins": ["compat"],
      "extends": ["plugin:compat/recommended"],
    }
  ]
}
