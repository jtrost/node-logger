var mongoose = require('mongoose');

// Public API
module.exports = {
  connect: function () {
    mongoose.connect('mongodb://localhost/logger');
  }
};