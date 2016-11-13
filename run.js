var Infrastructure = require("github.com/ejj/quilt-demo/inf");
var Spark = require("github.com/ejj/quilt-demo/spark");

var sparkWorkers = 3;

inf = Infrastructure.New(sparkWorkers + 1);
spark = Spark.New(inf, sparkWorkers);
