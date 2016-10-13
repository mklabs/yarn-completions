const fs = require('fs');
const path = require('path');

const NODE_MODULES = path.resolve('node_modules');

module.exports = (data, done) => {
  fs.stat(NODE_MODULES, (err, exists) => {
    if (err) return done(err);

    fs.readdir(NODE_MODULES, (err, files) => {
      if (err) return done(err);
      return done(null, files);
    });
  });
};
