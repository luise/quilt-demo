"use strict";

var quilt = require("@quilt/quilt");
var HaProxy = require("@quilt/haproxy").Haproxy;
var Mongo = require("@quilt/mongo");
var Node = require("@quilt/nodejs");
var Inf = require("./inf.js");

var count = 4;
var mongo = new Mongo(count);
var app = new Node({
    nWorker: count,
    repo: "https://github.com/quilt/node-todo.git",
    env: {
        PORT: "80",
        MONGO_URI: mongo.uri("mean-example")
    }
});
var haproxy = new HaProxy(count, app.services());

mongo.connect(mongo.port, app);
app.connect(mongo.port, mongo);
haproxy.public();

var inf = Inf.New(4);
inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
