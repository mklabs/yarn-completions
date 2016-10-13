const fs = require('fs');
const path = require('path');

module.exports = (data, done) => {
  fs.stat(path.resolve('package.json'), function (err, exists) {
    if (err) return done(err);

    let { dependencies, devDependencies } = require(path.resolve('package.json'));
    if (!dependencies || !devDependencies) return;

    return done(null, Object.keys(dependencies).concat(Object.keys(devDependencies)));
  });
};
