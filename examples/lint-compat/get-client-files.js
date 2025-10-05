const { globSync } = require('glob');
const fs = require('fs');
const path = require('path');
const dependencyTree = require('dependency-tree');

function getClientFileList() {
  try {
    const srcPath = path.resolve(__dirname, `./src`);
    const tsxFilePaths = globSync([`${srcPath}/**/*.tsx`, `${srcPath}/**/*.ts`], {
      ignore: 'node_modules/**'
    });

    const dependency = tsxFilePaths.reduce((acc, tsxFile) => {
      const d = dependencyTree.toList({
        filename: tsxFile,
        directory: 'path/to/all/files',
        filter: (path) =>
          !(
            /node_modules/.test(path) ||
            /s?.css/.test(path) ||
            /constants/.test(path)
          ),
        tsConfig: require('./tsconfig.json'),
      });

      return [...acc, ...d];
    }, []);

    const clientFiles = dependency.filter((tsxFile) => {
      const content = fs.readFileSync(tsxFile, 'utf-8');
      return /['"]use client['"]\;?/.test(content);
    });

    const result = [...new Set(clientFiles)];
    return result;
  } catch (err) {
    console.error('get client file list error: ', err);
    return ['./src/**/*.{tsx,ts}'];
  }
}

/** @desc 린트 파일 검사 경로를 위한 log 출력 */
console.log(getClientFileList().join(' '));