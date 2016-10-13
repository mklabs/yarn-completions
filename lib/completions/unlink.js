const fs = require('fs');
const path = require('path');
const intersection = require('lodash.intersection');

const LINK_FOLDER = path.join(require('user-home'), '.yarn-cache/.link');
const NODE_MODULES = path.resolve('node_modules');

let isNodeModulesLink = (file) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path.join(NODE_MODULES, file), function (err, stat) {
      if (err) return reject(err);
      resolve({
        file: file,
        link: stat.isSymbolicLink()
      });
    });
  });
};

let intersectYarnLinks = (links) => {
  return new Promise((resolve, reject) => {
    fs.stat(LINK_FOLDER, (err, exists) => {
      if (err) return reject(err);

      fs.readdir(LINK_FOLDER, (err, files) => {
        if (err) return reject(err);
        return resolve(intersection(files, links));
      });
    });
  });
};

module.exports = (data, done) => {
  fs.stat(NODE_MODULES, (err, exists) => {
    if (err) return done(err);

    fs.readdir(NODE_MODULES, (err, files) => {
      if (err) return done(err);

      return Promise.all(files.map((file) => isNodeModulesLink(file)))
        .then((links) => {
          return links.filter((link) => link.link).map((link) => link.file);
        })
        .then((links) => {
          return intersectYarnLinks(links);
        })
        .then((links) => {
          return done(null, links);
        })
        .catch(done);
    });
  });
};
