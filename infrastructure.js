exports.create = function(workerCount) {
    var deployment = createDeployment({
        adminACL: ["local"],
    });

    // An AWS VM with 1-2 CPUs and 1-2 GiB RAM.
    // The Github user `ejj` can ssh into the VMs.
    var baseMachine = new Machine({
        provider: "Amazon",
        size: "m4.large",
        sshKeys: githubKeys("ejj"),
    });

    // Boot VMs with the properties of `baseMachine`.
    deployment.deploy(baseMachine.asMaster());
    deployment.deploy(baseMachine.asWorker().replicate(workerCount));
    return deployment
}
