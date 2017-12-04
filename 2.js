


var ZooKeeper = require ("zookeeper");
var zookeeper = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false
});
zookeeper.connect(function(){
zookeeper.a_create('/',"some value", ZooKeeper.ZOO_SEQUENCE | ZooKeeper.ZOO_EPHEMERAL, function (error, path) {
    if (error) {
        if (error.getCode() == zookeeper.Exception.NODE_EXISTS) {
            console.log('Node exists.');
        } else {
            console.log(error.stack);
        }
        return;

        
    }

    console.log('Node: %s is created.', path);
    
});
});




    
