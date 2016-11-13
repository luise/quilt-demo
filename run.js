var infrastructure = require("github.com/ejj/quilt-demo/infrastructure")
var spark = require("github.com/ejj/quilt-demo/spark")

var workerCount = 5;
deployment = infrastructure.createDeployment(workerCount + 1);
spark = new Spark(workerCount);
deployment.deploy(spark);
