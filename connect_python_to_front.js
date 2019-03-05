//create the global variable at the reception of back end data
var data_backend = 0;


function launch_backend() {


    var {PythonShell} = require('python-shell');
    var path = require("path");


    var options = {
      mode: 'text',
      encoding: 'utf8',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: path.join(__dirname, '/../engine/'),
      args: ['hello world']
    };
     

    var test = new PythonShell('back_end.py' , options);

    // handle message (a line of text from stdout, parsed as JSON)
    test.on('message', function(message) {
      console.log("5sec later, new output from stdout from the python code") 
      console.log(message)
      data_backend = message
      //document.getElementById("last_value").innerHTML = message
    });

  
    /*

    var t0 = performance.now();
    var test = new PythonShell('back_end.py' , options);
    var t1 = performance.now();

    console.log("It took exactly" + (t1 - t0) + " milliseconds." + "to compute the javascript code");
    console.log("what is going on?");
    console.log(test);
    console.log("did the print json got stored in test?");

    */

}



function some_function() {


}



