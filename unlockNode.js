 //unlock the node 
   /*     
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
*/