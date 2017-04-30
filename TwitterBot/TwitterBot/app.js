'use strict';
var Twit = require('twit');
var token = require('./token.js');
var fs = require('fs')
var t = new Twit({
    consumer_key: token.consumer_key,
    consumer_secret: token.consumer_secret,
    access_token: token.access_token,
    access_token_secret: token.access_token_secret
});

console.log("Twitter Bot Running");
function deleteMessage(id) {
    t.post('direct_messages/destroy', { id: id }, function (error) { if (error) { console.warn(error); } });
}
var stream = t.stream("user");

stream.on('direct_message', function (eventMsg) {
    var msg = eventMsg.direct_message.text;
    var screenName = eventMsg.direct_message.sender.screen_name;
    var msgID = eventMsg.direct_message.id_str;

    if (screenName == "SPMNJ") {
        if (msg.startsWith("add")) {
            var addnew = msg.substr(msg.indexOf("@"))
            fs.readFile("./users.json", 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var obj = JSON.parse(data);
                    obj.users.push({ "name": addnew }); //add some data
                    var json = JSON.stringify(obj); //convert it back to json
                    fs.writeFileSync('./users.json', json, 'utf8'); // write it back
                    deleteMessage(msgID)
                }
            });
        }
    }
});
