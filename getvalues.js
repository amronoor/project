var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
zk.connect(function(){
    //create
    console.log ("connected");
    
    //for loop to create a certin number of node not complete 
   
        zk.a_get("/TotalNode",false,function(rc,err,value,data){
           console.log("rc",rc,'err',err,'value',value,data);
           total=parseInt(data);
        
    }  );

    

            /*var total_version=parseInt(value.version);
            console.log("version:",total_version);
       
            zk.a_set("/testnode",total,total_version,function(rc,err,stat){
                console.log('rc:',rc,'err:',err,'stat:',stat);
               
           })

             });*/

  /*           
             zk.a_delete_("/testnode",-1,function(rc,error,value){
                
                console.log("rc",rc,'err',error,'value',value);
                console.log("node is deleted ");
                
            })
            zk.a_create("/testnode", 15,null,
            function (rc, error, path)  {
                if (rc != 0) {
                    console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
                } else {
                    console.log ("created zk node %s", path);
                    process.nextTick(function () {
                     //zookeeper.close ();
                    });
                }
            });*/

          /* zk.a_get("/testnode",false,function(rc,err,value,data){
          //  console.log("rc",rc,'err',err,'value',value,data);
           data=parseInt(data);
             console.log("after updte",data);
             });*/ 

           
               
         
    //zk.close ();
});
