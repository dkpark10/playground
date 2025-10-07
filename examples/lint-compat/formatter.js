/** @param {any[]} results */
function lintFormatter(results) {
  return results.map((result) => {
    return result.messages.filter((message) => /compat/.test(message.ruleId)).map((message) => {
      return `${result.filePath}:${message.line}:${message.column} — ${message.message} [${message.ruleId}]\n`;
    })
  }).join('') + '\n호환되지 않은 브라우저 api가 발견되었습니다. eslintrc.js 에서 polyfill을 추가하거나 룰을 무시하세요.';
}

module.exports = lintFormatter;