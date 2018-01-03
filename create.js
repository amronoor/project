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
    
    
    
   zookeeper.a_create("/onProgress", 0 ,null,
   function (rc, error, path)  {
       if (rc != 0) {
           console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
       } else {
           console.log ("created zk node %s", path);
           process.nextTick(function () {
            zookeeper.close ();
           });
       }
   });
    
   
   // zookeeper.close ();


});