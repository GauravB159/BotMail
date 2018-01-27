const webpack = require('webpack');
const card = require('./webpack.config.card.js');
const login = require('./webpack.config.login.js');
module.exports = [
  card, login
];
