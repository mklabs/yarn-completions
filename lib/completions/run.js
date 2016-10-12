const fs = require('fs');
const path = require('path');
const debug = require('tabtab/lib/debug')('yarn-completions:run');

module.exports = (data, done) => {
  fs.stat(path.resolve('package.json'), function (err, exists) {
    if (err) return done(err);

    let scripts = require(path.resolve('package.json')).scripts;
    if (!scripts) return;

    return done(null, Object.keys(scripts));
  });
};
