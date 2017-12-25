var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
zk.connect(function getTasks(err)

{ zk.a_exists("/Tasks",true,function(rc,err,value){
          console.log("rc",rc,"err",err,"value",value);
});
       /// new line
     
 //todo: get children (1)
            zk.aw_get_children("/Tasks/child0000033925",function(type, state, path )
             {
                          console.log("type",type,"state",state,"path" ,path);
       
                            },function(rc,error,children){
                                console.log("rc",rc,"error",error,"Childens",children)
                                    var FirstChild=children[0];
                                    console.log("first child:",FirstChild);
 
  
 });
         


        //var currentTask="/Tasks/child0000017961";
         //zk.a_get("/Tasks/child0000029124",false,function(rc,err,value,data){
           // console.log("rc",rc,'err',err,'value',value,data);
            // console.log(data);
             //proccessTasks(data);
        
           

});
         
         
       // });

 
function proccessTasks(data)
{
    var sum;
    
         data=parseInt(data);
         //proccessTasks(data);
         sum = parseInt (sum) +data; 
         console.log("sum=",sum); 
         
    updateTotal(sum);
}




function updateTotal(sum)
{
    //check if total node exist
    zk.a_exists("/Total",false,function(rc,err,value)
    {
      if(!value){
        console.log("Not exist");
         
    zk.a_create("/Total",0 , null,
    function (rc, error, path)  {
        if (rc != 0) {
            console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
        } else {
            console.log ("created zk node %s", path);
            process.nextTick(function () {
             zk.close ();
            });
        }
    });
      } else

      {
      zk.a_get("/Total",false,function(rc,err,value,data){
        console.log('data',data);
        total=parseInt(data);
        total=parseInt(total)+parseInt(sum);
        //total=data+sum;
        //console.log("total",total);
        

        zk.a_set("/Total",total,0,function(rc,err,stat){
            //data=JSON.parse(data);
            console.log('sumation',sum);
            //getTasks();
        })
    }) ;
           }
} );

}
 
  
  
