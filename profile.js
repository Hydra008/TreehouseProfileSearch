const https = require("https");
const http = require("http");
const EventEmitter = require("events").EventEmitter;
const util = require("util");



function Profile(username) {

    EventEmitter.call(this);

    let  profileEmitter = this;

    const request = https.get("https://teamtreehouse.com/" + username + ".json", response => {
        let body = "";
        response.on('data', data => {
           body += data;
        });
        response.on('end', () => {
            try {
               let profile = JSON.parse(body.toString());
               profileEmitter.emit("end",profile);
               //the profileEmitter emits the event end with variable profile as argument
            } catch(error) {
               profileEmitter.emit("error",error);
            }
        }).on("error", error => {
           profileEmitter.emit("error",error);
        });
    });
}
util.inherits(Profile, EventEmitter)
module.exports = Profile;