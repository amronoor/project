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
         /* zk.aw_get_children("/Tasks",
          function(type,state,path){
              console.log("type",type,state,path);
              zk.a_get_children("/Tasks",true,function(rc,error,value){
                  console.log("tasks",value);
                  });
          },
          function(rc,error,value){
          console.log("tasks",value);
          proccessTasks(value);
          });*/

        //we must init the child node every time we need to read the value of it 
        zk.a_get("/Tasks/child0000017961",false,function(rc,err,value,data){
            console.log("rc",rc,'err',err,'value',value,JSON.stringify(data));
           //data=JSON.parse(data);
             console.log(data);
             proccessTasks(data);
             });

//data is just one value and it doesn't need for loop 
       
        
});
 
// proccessTasks(data);
function proccessTasks(data)
{
    //it doesn't add the value in the child node it print it beside the 0
    var sum=0;
    
        sum =sum + data; 
        console.log("sum=",sum);  
    

    //updateTotal(sum);
}

function updateTotal(sum)
{
    
    zk.a_get("/Total",false,function(rc,err,value,data){
        console.log("rc",rc,'err',err,'value',value,'data',data);
        //data=JSON.parse(data);
        //total=data+sum;
        //console.log("total",total);
        //saveTotal(data)
        return data;
    }) ;

    zk.a_set("/Total",JSON.stringify({sumation:sum}),0,function(rc,err,stat){
        //data=JSON.parse(data);
        console.log('rc',rc,'err',err,'stat',stat,'sumation',sum);
    })
    //getTasks(err);
    //return data;
}


/*
function saveTotal(sum)
{
    zk.a_set("/Total",JSON.stringify({sumation:sum}),0,function(rc,err,stat){
        data=JSON.parse(data);
        console.log('rc',rc,'err',err,'stat',stat,'sumation',data.sum);
    })
    getTasks(err);
}
function proccessTasks(data)
{
    var sum=0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i];   
    }

    updateTotal(sum);
}

function updateTotal(sum)
{
    
    zk.a_get("/Total",false,function(rc,err,value,data){
        console.log("rc",rc,'err',err,'value',value,JSON.stringify(data));
        data=JSON.parse(data);
        data=data+sum;
        console.log("total",data.sum);
        //saveTotal(data)
    })  
    return data.total;
}

function saveTotal(sum)
{
    zk.a_set("/Total",JSON.stsringify({sumation:sum}),0,function(rc,err,stat){
        data=JSON.parse(data);
        console.log('rc',rc,'err',err,'stat',stat,'sumation',data.sum);
    })
    getTasks(err);
}

*/

