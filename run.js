var Infrastructure = require("github.com/ejj/quilt-demo/infrastructure");
var Spark = require("github.com/ejj/quilt-demo/spark");

var sparkWorkers = 3;
deployment = Infrastructure.create(sparkWorkers+ 1);
spark = new Spark(sparkWorkers);
deployment.deploy(spark);
