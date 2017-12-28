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
              });
          
          } else { //if exists get the children then get the first child path 
           console.log("`tasks node exist");
                     zk.aw_get_children("/Tasks",function(type, state, path )
                     {
                         console.log("type",type,"state",state,"path" ,path);
                           
                     },function(rc,error,children){
                      console.log("Childrens",children);
                      if(children.length>0){
                        var FirstChild="/Tasks/"+children[0]; 
                        //children[0];
                        console.log("first child:",FirstChild);
                         getValue(FirstChild);
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

//get the value from getValue function and do the summation process
function proccessTasks (value)
{
     
    updateTotal(value);

} 
//get the value from proccessTasks function to update the total at Total node 
function updateTotal(value)
{
    console.log("updateTotal",value);
    //check if Total node exist
    zk.a_exists("/TotalNode",false,function(rc,err,value)
    {
      if(!value){
        console.log("Not exist");
         
    zk.a_create("/TotalNode",0 , null,
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

      zk.a_get("/TotalNode",false,function(rc,err,value,data){
        console.log("Get total: ",'data',data);
        total=parseInt(data);
        console.log("Get total: ",'data',total);
       // total=parseInt(total)+parseInt(value)+1000;
        console.log("total=",parseInt(total));

        var version=value.version;
         // Store the total value at the Total node 
        zk.a_set("/TotalNode",total,version,function(rc,err,stat){
            console.log('rc:',rc,'err:',err,'stat:',stat,'Total=',total);
            
        })


        //getTasks(err);
    });
           }

          




});
}

}
//give it the old path and the new path to put the node in lock 

//convert these function to a general functions 
//locking
/*var from ="/workers1/"+client.client_id;
var to ="/Machines"
function moveNode(from,to)

{
    zk.a_delete_(from,-1,function(rc,error,value){
        
        console.log("rc",rc,'err',error,'value',value);
        console.log("node is deleted ");
        
    });
    
    zk.a_create(to, 15 ,null,
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
    
}*/

/*
function updateNodeValue(path,value){
    zk.a_get(path,false,function(rc,err,value,data){
        console.log("Get total: ",'data',data);
        total=parseInt(data);
        total=parseInt(total)+parseInt(sum)+1000;//we add 1000 to test only 
        console.log("total=",parseInt(total));

        var version=value.version;
         // Store the total value at the Total node 
        zk.a_set(path,total,version,function(rc,err,stat){
            console.log('rc:',rc,'err:',err,'stat:',stat,'Total=',total);
            
        })
});*/ 


