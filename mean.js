var HaProxy = require("github.com/NetSys/quilt/specs/haproxy/haproxy").Haproxy;
var Mongo = require("github.com/NetSys/quilt/specs/mongo/mongo");
var Node = require("github.com/NetSys/quilt/specs/node/node");
var Inf = require("github.com/ejj/quilt-demo/inf");

var size = 4;

inf = Inf.New(size);

var mongo = new Mongo(size);
var app = new Node({
  nWorker: size,
  image: "quilt/mean-service",
  env: {
    PORT: "80",
    MONGO_URI: mongo.uri("mean-example")
  }
});
var haproxy = new HaProxy(size, app.services());

// Places all haproxy containers on separate Worker VMs.
haproxy.service.place(new LabelRule(true, haproxy.service));

mongo.connect(mongo.port(), app);
app.connect(mongo.port(), mongo);
haproxy.public();

inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
