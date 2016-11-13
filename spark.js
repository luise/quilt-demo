var defaultImage = "quilt/spark";

module.exports = function (sparkWorkers, image) {
    this.master = new Service("spark-master",
        [new Container(image, ["run", "master"])]);

    this.workers = new Service("spark-worker",
        new Container(image, ["run", "worker"])
            .withEnv({"MASTERS": this.master.hostname()})
            .replicate(sparkWorkers));

    this.workers.connect(7077, this.workers);
    this.workers.connect(7077, this.master);

    this.deploy = function(deployment) {
        deployment.deploy(this.master);
        deployment.deploy(this.workers);
    }
};
