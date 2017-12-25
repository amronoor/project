var ZooKeeper = require ("zookeeper");
var zookeeper = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false
});

var p;
zookeeper.connect(function(){
//get the children of the node 
zookeeper.a_get_children("/Tasks",true,function(rc,error,value){
console.log("items",value);
});

 
//monitor if the child exist or deleted
zookeeper.aw_get_children("/Tasks",
function(type,state,path){
    console.log("type",type,state,path);
    zookeeper.a_get_children("/Tasks",true,function(rc,error,value){
        console.log("items",value);
        });
},
function(rc,error,value){
console.log("items",value);

}



);



});