var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
//connect to the server and getTask 
zk.connect(function getTask (err){
 



//check if the Taskes node exists
zk.a_exists("/Tasks",true,function(rc,err,value){
          console.log("rc",rc,"err",err,"value",value);
                   
          if(!value) //if not exists create it 
          {
               zk.a_create("/Tasks","some data", null,
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
          
          } else { //if exists get the children then get the first child path 
          
                     zk.aw_get_children("/Tasks",function(type, state, path )
                     {
                         console.log("type",type,"state",state,"path" ,path);
                           
                     },function(rc,error,children){
                      console.log("rc",rc,"error",error,"Childrens",children);
                      var FirstChild="/Tasks/child0000037573";//children[0];
                      console.log("first child:",FirstChild);
                       getValue(FirstChild);
                      
                     });

                  }

                          
          
});
//get the first child path and then get the value from it 
function getValue(FirstChild)
{
    zk.a_get(FirstChild,true,function(rc,err,stat,value){
        console.log("rc : " ,rc, "err : ", err, "stat : ",stat, "value : ", value );
        proccessTasks(value);
    });
}

//get the value from getValue function and do the summation process
function proccessTasks (value)
{var sum=0;
    sum = parseInt (sum) +parseInt(value); 
    console.log("sum=",sum); 
    updateTotal(sum);

} 
//get the sum from proccessTasks function to update the total at Total node 
function updateTotal(sum)
{
    //check if Total node exist
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
      } else // if exists get the Total valu from the Total node and add the sum to it  

      {
      zk.a_get("/Total",false,function(rc,err,value,data){
        console.log("rc",rc,'err',err,'value',value,'data',data);
        total=parseInt(data);
        total=parseInt(total)+parseInt(sum);
        console.log("total",total);
        
         // Store the total value at the Total node 
        zk.a_set("/Total",total,0,function(rc,err,stat){
            //data=JSON.parse(data);
            console.log('rc',rc,'err',err,'stat',stat,'sumation',sum);
            //getTasks(err);
        })
    }) ;
           }
});
}


});

