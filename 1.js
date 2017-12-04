var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
    connect: "localhost:2181"
    ,timeout: 2000000
    ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
    ,host_order_deterministic: false,
    data_as_buffer:false
});

zk.connect(function (){
console.log ("zk session established, id=%s", zk.client_id);
zk.a_exists("/Tasks",true,function(rc,err,value)
  {
    console.log("rc",rc,"err",err,"value",value);
       
   });

var tasks_ids;

zk.a_get_children("/Tasks",true,function(rc,err,value){
    console.log("rc",rc,'err',err,'value',value);
    console.log("tasks",value);
});

zk.aw_get_children("/Tasks",
function(type,state,path){
    console.log("type",type,state,path);
    zookeeper.a_get_children("/Tasks",true,function(rc,error,value){
        console.log("tasks",value);
        });
},
function(rc,error,value){
console.log("tasks",value);

});


zk.a_get("/Tasks/child",true,function(rc,err,value,data){
    console.log("rc",rc,'err',err,'value',value,JSON.stringify(data));
       data=JSON.parse(data);
             console.log(data);
 });



});