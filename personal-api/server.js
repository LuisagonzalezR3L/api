var cluster = require('cluster');
if (cluster.isMaster) {
  
  require('./app/init/db');
  require('./app/init/bootstrap')();
    

  var cpuCount = 1; 
  var workerIds = [];
 
  for (var i = 0; i < cpuCount; i += 1) {
    var worker = cluster.fork();
    workerIds[worker.id] = worker.id;
      
  }

  cluster.on('exit', function (worker) {
    console.log('Worker %d down', worker.id);
    delete workerIds[worker.id];
    var worker = cluster.fork();
    workerIds[worker.id] = worker.id;
  });


} else {
  
  var expressInitializer = require('./app/init/express');
  expressInitializer();

  process.on('message', function(message){

    switch(message.type){
      
    case 'shutdown':
      process.exit(0);
      break;
    default:
      break;
    }
    
  });

  
}
