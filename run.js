var Infrastructure = require("github.com/ejj/quilt-demo/infrastructure")
var Spark = require("github.com/ejj/quilt-demo/spark")

var workerCount = 5;
deployment = Infrastructure.create(workerCount + 1);
spark = new Spark(workerCount);
deployment.deploy(spark);
