var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
zk.connect(function (err) {

    zk.a_delete_("/sh54",0,function(rc,error,value){
        
        console.log("rc",rc,'err',err,'value',value);
        
    })

});