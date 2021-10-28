// keys.js - figure out what set of credectials to return
if (process.env.NODE_ENV === 'production') {
  // We're in production - returnthe prod set of keys
  module.exports = require('./prod');
} else {
  // process.env.NODE_ENV === 'development'
  module.exports = require('./dev');
}
