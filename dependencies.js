const dependencies = {
    express: require("express"),
    ejs: require('ejs'),
    bcrypt: require('bcrypt'),
    passport: require('passport'),
    initialize: require('./passport-config'),
    flash: require('express-flash'),
    session: require('express-session'),
    MOR: require('method-override'),
};

module.exports = dependencies