var defaultCount = 4;

exports.New = function() {
    if (typeof count !== 'number') {
        count = defaultCount
    }

    var inf = createDeployment({});

    var machine = new Machine({
        provider: "Amazon",
        size: "m4.xlarge",
        sshKeys: githubKeys("ejj"),
    });

    inf.deploy(machine.asMaster());
    inf.deploy(machine.asWorker().replicate(count));
    return inf
}
