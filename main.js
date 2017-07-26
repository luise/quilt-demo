const quilt = require('@quilt/quilt');
const TodoApp = require('./todo_app.js');
const utils = require('./utils.js');

// Replication to use for the node application
// and Mongo.
const count = 2;
const infrastructure = quilt.createDeployment();

const machine = new quilt.Machine({
  provider: 'Amazon',
  cpu: 4,
  ram: 8,
});

utils.addSshKey(machine);

infrastructure.deploy(machine.asMaster());
infrastructure.deploy(machine.asWorker().replicate(count));

const todoApp = new TodoApp(count);
infrastructure.deploy(todoApp);
