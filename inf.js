exports.New = function(count) {
    var infrastructure = createDeployment({
        adminACL: ["local"],
    });

    var baseMachine = new Machine({
        provider: "Amazon",
        size: "m4.large",
        sshKeys: githubKeys("ejj"),
    });

    infrastructure.deploy(baseMachine.asMaster());
    infrastructure.deploy(baseMachine.asWorker().replicate(count));
    return infrastructure
}
