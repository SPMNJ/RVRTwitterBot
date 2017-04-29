'use strict';
var Twit = require('twit');
var token = require('./token.js');
var t = new Twit({
    consumer_key: token.consumer_key,
    consumer_secret: token.consumer_secret,
    access_token: token.access_token,
    access_token_secret: token.access_token_secret
});
var stream = t.stream('user');

stream.on('direct_message', function (eventMsg) {
    var msg = eventMsg.direct_message.text;
    var screenName = eventMsg.direct_message.sender.screen_name;
    var msgID = eventMsg.direct_message.id_str;

    console.log('I just received a message from ' + screenName);
    console.log('msg: ' + msg);
    console.log('id: ' + msgID);
});
