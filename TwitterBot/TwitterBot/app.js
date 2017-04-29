'use strict';
var Twit = require('twit');
var token = require('./token.js');
var t = new Twit({
    consumer_key: token.consumer_key,
    consumer_secret: token.consumer_secret,
    access_token: token.access_token,
    access_token_secret: token.access_token_secret
});

