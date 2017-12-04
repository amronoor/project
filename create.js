var ZooKeeper = require ("zookeeper");
var zookeeper = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false
});
 zookeeper.connect(function(){
   //create
    //for loop to create a certin number of node not complete
    var created=0; 
    for(var i =1;i<=5;i++)
    {
   zookeeper.a_create("/sh545", JSON.stringify({start:0,end:1000}),ZooKeeper.ZOO_SEQUENCE | ZooKeeper.ZOO_EPHEMERAL,
   function (rc, error, path)  {
       if (rc != 0) {
           console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
       } else {
           console.log ("created zk node %s", path);
           process.nextTick(function () {
           //
           });
       }
   });
    }
   
   // zookeeper.close ();


});