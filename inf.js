var quilt = require("@quilt/quilt");

exports.New = function(count) {
    var inf = quilt.createDeployment({});

    var machine = new quilt.Machine({
        provider: "Amazon",
        cpus: new quilt.Range(4, 8),
        ram: new quilt.Range(16, 64),
        sshKeys: quilt.githubKeys("ejj"),
    });

    inf.deploy(machine.asMaster());
    inf.deploy(machine.asWorker().replicate(count));
    return inf
}
