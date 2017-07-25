'use strict';

const HaProxy = require('@quilt/haproxy').Haproxy;
const Mongo = require('@quilt/mongo');
const Node = require('@quilt/nodejs');
const Inf = require('./inf.js');

const count = 4;
const mongo = new Mongo(count);
const app = new Node({
  nWorker: count,
  repo: 'https://github.com/quilt/node-todo.git',
  env: {
    PORT: '80',
    MONGO_URI: mongo.uri('mean-example'),
  },
});
const haproxy = new HaProxy(count, app.services());

mongo.connect(mongo.port, app);
app.connect(mongo.port, mongo);
haproxy.public();

const inf = Inf.createInfrastructure(4);
inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
