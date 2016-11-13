var defaultImage = "quilt/spark";

module.exports = function (nWorker, image) {
    var masterContainers = [new Container(image, ["run", "master"])];
    this.masters = new Service("spark-ms", masterContainers);

    var workerContainers = new Container(image, ["run", "worker"])
        .withEnv({"MASTERS": this.masters.children().join(",")})
        .replicate(nWorker);
    this.workers = new Service("spark-wk", workerContainers);

    this.workers.connect(7077, this.workers);
    this.workers.connect(7077, this.masters);

    this.deploy = function(deployment) {
        deployment.deploy(this.masters);
        deployment.deploy(this.workers);
    }
};
