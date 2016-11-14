exports.New = function(count) {
    var inf = createDeployment({
        adminACL: ["local"],
    });

    var baseMachine = new Machine({
        provider: "Amazon",
        size: "m4.xlarge",
        sshKeys: githubKeys("ejj"),
    });

    inf.deploy(baseMachine.asMaster());
    inf.deploy(baseMachine.asWorker().replicate(count));
    return inf
}
