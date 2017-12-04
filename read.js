var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
zk.connect(function (err) {

    if(err) throw err;
    console.log ("zk session established, id=%s", zk.client_id);
   
    
  zk.a_get("/sh5450000000078",false,function(rc,err,value,data){
   console.log("rc",rc,'err',err,'value',value,JSON.stringify(data));
   data=JSON.parse(data);
    console.log(data);
    })
});




