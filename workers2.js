var ZooKeeper = require ("zookeeper");
var zk = new ZooKeeper({
  connect: "localhost:2181"
 ,timeout: 2000000
 ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
 ,host_order_deterministic: false,
 data_as_buffer:false
});
//connect to the server and getTask 
zk.connect(getTask);

function getTask (err,client){
    console.log("sss",err,client.client_id),client;
   //check if the Taskes node exists
   zk.a_exists("/Tasks",true,function(rc,err,value){
            // console.log("rc",rc,"err",err,"value",value);
                      
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
                 });''
             
             } else { //if exists get the children then get the first child path 
              console.log("`tasks node exist");
                        zk.aw_get_children("/Tasks",function(type, state, path )
                        {
                            console.log("type",type,"state",state,"path" ,path);
                              
                        },function(rc,error,children){
                         console.log("Childrens",children);
                         if(children.length>0)
                         
                         var FirstChild
                         {
                             for(var i =0;i<children.length;i++){
                           FirstChild="/Tasks/"+children[i]; 
                           var OperatTask=children[i];//to Lock it when it has been processed 
                           console.log("first child:",FirstChild);
                           getValue(FirstChild);
                           LockNode(OperatTask);
                        }
                           
                         }
                         
                         
                        });
   
                     }
   
                             
                         
   });

   //get the first child path and then get the value from it 
function getValue(FirstChild)
{
    console.log("get value function:",FirstChild);
    zk.a_get(FirstChild,true,function(rc,err,stat,value){
      //  console.log("rc : " ,rc, "err : ", err, "stat : ",stat, "value : ", value );
       proccessTasks(parseInt( value));
    });
}

function LockNode(OperatTask,value)
{
    zk.a_delete_(OperatTask,-1,function(rc,error,value){
        
        console.log("rc",rc,'err',error,'value',value);
        console.log("node is deleted ");
        
    });
    
    zk.a_create("/Machines/"+OperatTask,parseInt(value),null,
    function (rc, error, path)  {
        if (rc != 0) {
            console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
        } else {
            console.log ("created zk node %s", path);
            process.nextTick(function () {
             //zookeeper.close ();
            });
        }
    });
}



//get the value from getValue function and do the summation process
function proccessTasks (value)
{
     
    updateTotal(value);

}

function updateTotal(value)
{
    console.log("updateTotal",value);
    //check if Total node exist
    zk.a_exists("/TheTotalNode",false,function(rc,err,value)
    {
      if(!value){
        console.log("Not exist");
         
    zk.a_create("/TheTotalNode",0 , null,
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

      zk.a_get("/TheTotalNode",false,function(rc,err,value,data){
        console.log("Get total: ",'data',data);
        total=parseInt(data);
        console.log("Get total: ",'data',total);

        /* i guess there a problem in this statement cause if i operate it it give the total value Nan*/ 
        //total=parseInt (total)+ parseInt(value)+1000; 
         
        console.log("total=",parseInt(total));

        var version=value.version;
         // Store the total value at the Total node 
        zk.a_set("/TotalNode",total,version,function(rc,err,stat){
            console.log('rc:',rc,'err:',err,'stat:',stat,'Total=',total);
            
        })


        //getTasks(err);
    });
           }

        //unlock the node   
function UnlockNode(OperatTask,value)
{
    zk.a_delete_("/Machines/"+OperatTask,-1,function(rc,error,value){
        
        console.log("rc",rc,'err',error,'value',value);
        console.log("node is deleted ");
        
    });
    
    zk.a_create(OperatTask,parseInt(value),null,
    function (rc, error, path)  {
        if (rc != 0) {
            console.log ("zk node create result: %d, error: '%s', path=%s", rc, error, path);
        } else {
            console.log ("created zk node %s", path);
            process.nextTick(function () {
             //zookeeper.close ();
            });
        }
    });
}



});
}
}