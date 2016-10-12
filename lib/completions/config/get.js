const debug = require('tabtab/lib/debug')('yarn-completions:config:get');
const DEFAULTS = require('yarn/lib/registries/yarn-registry').DEFAULTS;

module.exports = (data, done) => {
  return done(null, Object.keys(DEFAULTS));
};
