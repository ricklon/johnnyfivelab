var config = require("config");
var fs = require("fs");
var serialport = require('serialport');
var prompt = require('prompt');
var SerialPort = serialport.SerialPort;
var portName;

console.log("Current port: %s", config.get('port'));
prompt.start();
// list serial ports:
console.log("Select serial port by typing it's number into the prompt.");
serialport.list(function(err, ports) {
    ports.forEach(function(port, ii) {
        console.log("(%d): %s", ii, port.comName);
    });
    prompt.get(['num'], function(err, result) {
        console.log("Port Selected: %s", ports[result.num].comName);
        portName = ports[result.num].comName;
	config.get('port') = portName;
	fs.writeFile("config",JSON.stringify(config).replace(/\"([^(\")"]+)\":/g,"$1:"), function(err) {
    if(err) {
        return console.log(err);
    }
    });
    //console.log("Port Selected: %s, ", portName);
});
});
