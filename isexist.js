var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});

zk.connect (function(){


  zk.a_exists("/TotalNode",false,function(rc,err,value)
  {
    if(!value){
      //create the node
      console.log("Not exist");

    }else {
      console.log("existe")
    } 






   // console.log("rc",rc,"err",err,"value",value);
  });
/*
  zk.aw_exists("/Tasks2",function(type,stat,path){
    console.log("type",type,"stat",stat,"path",path);
  },function(rc,err,value){
      console.log("rc",rc,"err",err,"value",value);
  })
  */
});

