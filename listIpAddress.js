let config = require('config');
const fs = require('fs');
const os = require('os');
const prompt = require('prompt');

let myConfig = {};

const ifaces = os.networkInterfaces();
let adresses = [];


if (config.has('ip')) {
console.log('Current IP Address: %s', config.get('ip'));
  myConfig.ip = config.get('ip');
} else {
  myConfig.ip = "";
  console.log('No ip selected yet.');
}
if (config.has('port')) {
  console.log('Current Serial Port: %s', config.get('port'));
  myConfig.port = config.get('port');
} else {
  console.log('No port selected yet.');
  myConfig.port = "";
}

prompt.start();
// list ip addresses:
console.log('Select IP Address by typing it\'s number into the prompt.');

Object.keys(ifaces).forEach(function(ifname) {
  let alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(`(${alias}) ${ifname} : ${iface.address}`);
      adresses.push(iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(`(${alias}) ${ifname} : ${iface.address}`);
      adresses.push(iface.address);
    }
    prompt.get(['num'], function(err, result) {
      console.log('IP Selected: %s', adresses[result.num]);
      myConfig.ip = adresses[result.num];
      fs.writeFile('./config/default.json', JSON.stringify(myConfig), function (err) {
        if (err) {
          return console.log(err);
        }
      });
      alias += 1;
    });
  });
});
