var quilt = require("@quilt/quilt");

exports.New = function(count) {
    var inf = quilt.createDeployment({});

    var machine = new quilt.Machine({
        provider: "Amazon",
        size: "m4.xlarge",
        sshKeys: quilt.githubKeys("ejj"),
    });

    inf.deploy(machine.asMaster());
    inf.deploy(machine.asWorker().replicate(count));
    return inf
}
