let config = require('config');
const fs = require('fs');
const serialport = require('serialport');
const prompt = require('prompt');
//const SerialPort = serialport.SerialPort;
let portName;

if (config.has('port')) {
  console.log('Current port: %s', config.get('port'));
} else {
  console.log('No port selected yet.');
}
prompt.start();
// list serial ports:
console.log('Select serial port by typing it\'s number into the prompt.');
serialport.list(function(err, ports) {
  ports.forEach(function(port, ii) {
    console.log('(%d): %s', ii, port.comName);
  });
  prompt.get(['num'], function(err, result) {
    console.log('Port Selected: %s', ports[result.num].comName);
    config.port = ports[result.num].comName;
    fs.writeFile('./config/default.json', JSON.stringify(config), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    // console.log('Port Selected: %s, ', portName);
  });
});
