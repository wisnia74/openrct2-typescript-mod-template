const { execSync } = require('child_process');

exports.exec = (cmd, opts = { stdio: [0, 1, 2] }) => execSync(cmd, opts);

module.exports = exports;