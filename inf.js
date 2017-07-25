const quilt = require('@quilt/quilt');

exports.createInfrastructure = function(count) {
  const inf = quilt.createDeployment();

  const machine = new quilt.Machine({
    provider: 'Amazon',
    cpus: new quilt.Range(2, 8),
    ram: new quilt.Range(4, 64),
    sshKeys: quilt.githubKeys('ejj'),
  });

  inf.deploy(machine.asMaster());
  inf.deploy(machine.asWorker().replicate(count));
  return inf;
};
