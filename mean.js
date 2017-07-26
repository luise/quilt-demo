'use strict';

const HaProxy = require('@quilt/haproxy');
const Mongo = require('@quilt/mongo');
const Node = require('@quilt/nodejs');
const Inf = require('./inf.js');
const {publicInternet} = require('@quilt/quilt');

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

app.connect(mongo.port, mongo);
haproxy.service.allowFrom(publicInternet, 80);

const inf = Inf.createInfrastructure(4);
inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
