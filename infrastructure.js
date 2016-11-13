exports.create = function(count) {
    var deployment = createDeployment({
        adminACL: ["local"],
    });

    var baseMachine = new Machine({
        provider: "Amazon",
        size: "m4.large",
        sshKeys: githubKeys("ejj"),
    });

    deployment.deploy(baseMachine.asMaster());
    deployment.deploy(baseMachine.asWorker().replicate(count));
    return deployment
}
