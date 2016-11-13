var Infrastructure = require("github.com/ejj/quilt-demo/infrastructure");
var Spark = require("github.com/ejj/quilt-demo/spark");

var sparkWorkers = 3;
spark = new Spark(sparkWorkers);

var inf = Infrastructure.create(sparkWorkers + 1);
inf.deploy(spark);
