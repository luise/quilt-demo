'use strict';

const HaProxy = require('@quilt/haproxy');
const Mongo = require('@quilt/mongo');
const Node = require('@quilt/nodejs');
const {publicInternet} = require('@quilt/quilt');

function TodoApp(count) {
  const port = 80;
  this.mongo = new Mongo(count);
  this.app = new Node({
    nWorker: count,
    repo: 'https://github.com/quilt/node-todo.git',
    env: {
      PORT: port.toString(),
      MONGO_URI: this.mongo.uri('mean-example'),
    },
  });
  this.haproxy = new HaProxy(1, this.app.services());

  this.app.connect(this.mongo.port, this.mongo);
  this.haproxy.service.allowFrom(publicInternet, port);

  this.deploy = function(deployment) {
    deployment.deploy(this.app);
    deployment.deploy(this.mongo);
    deployment.deploy(this.haproxy);
  }
}

module.exports = TodoApp;
