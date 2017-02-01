var defaultImage = "quilt/spark";

exports.New = function (inf, sparkWorkers, image) {
  if (typeof image !== 'string') {
      image = defaultImage
  }

  var master = new Service("sprk-ms", [new Container(image, ["run", "master"])]);
  var workers = new Service("sprk-wk", new Container(image, ["run", "worker"])
                            .withEnv({"MASTERS": master.hostname()})
                            .replicate(sparkWorkers));

  workers.connect(7077, workers);
  workers.connect(7077, master);
  publicInternet.connect(8080, master)

  inf.deploy(master);
  inf.deploy(workers);
};
