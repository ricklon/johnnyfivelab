var colorThief = new ColorThief();

var app = angular.module('chipKITApp', ['btford.socket-io', 'ngMaterial', 'ngJsonExplorer', 'chart.js']).
config(function($mdThemingProvider) {
  var rgbMap = $mdThemingProvider.extendPalette('green', {
    'A100': '#ff0000',
    'A200': '#00ff00',
    'A300': '#0000ff'
  });
  $mdThemingProvider.definePalette('rgb', rgbMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('rgb');
}).
factory('socket', function(socketFactory) {
  return socketFactory();
}).
controller('ArduController', function($scope, socket) {
  socket.on('init', function(data) {
    $scope.temperature.curTemp = data.curTemp;
    $scope.board = data.board;
    var green = 255;
    for (var pixel = 0; pixel < 30; pixel++) {
      let data = {
        pixel: pixel,
        red: 0,
        green: green,
        blue: 0
      }
      socket.emit('ledstrip:setpixelcolor', data);
    }
    socket.emit('ledstrip:show');
    //console.log("INIT VALUES: " + JSON.stringify(data));
  });
  socket.on('sendTemp', function(data) {
    console.log("RECEIVED temp: ", data.curTemp);
    $scope.temperature.curTemp = data.curTemp;
    if (data.curTemp > $scope.temperature.maxTemp) {
      $scope.temperature.maxTemp = data.curTemp;
    }
    if (data.curTemp < $scope.temperature.minTemp) {
      $scope.temperature.minTemp = data.curTemp;
    }
    if (data.curTemp > $scope.temperature.lowAlarm && data.curTemp < $scope.temperature.highAlarm) {
      var green = 255;
      for (var pixel = 0; pixel < 30; pixel++) {
        let data = {
          pixel: pixel,
          red: 0,
          green: green,
          blue: 0
        }
        socket.emit('ledstrip:setpixelcolor', data);
      }
      socket.emit('ledstrip:show');
    }

    if ($scope.temperature.enableLOW) {
      if (data.curTemp < $scope.temperature.lowAlarm) {
        socket.emit('ledstrip:alertLOW');
        console.log("warning temp too low ");
        return;
      }
    }
    if ($scope.temperature.enableHIGH) {
      if (data.curTemp > $scope.temperature.highAlarm) {
        socket.emit('ledstrip:alertHIGH');
        console.log("warning temp too high ");
        return;
      }
    }

  });
  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };
  $scope.ledOn = function() {
    socket.emit('led:on');
    console.log('LED ON');
  };
  $scope.ledOff = function() {
    socket.emit('led:off');
    console.log('LED OFF');
  };
  $scope.showDominantColor = function() {
    var color = colorThief.getColor(document.getElementById("imgSample "));
    socket.emit('ledstrip:setframecolor', color);
    console.log(`color: ${color}`);
  }
  $scope.showColorPalette = function() {
    var palette = colorThief.getPalette(document.getElementById("imgSample "));
    var numColors = palette.length;
    var index = 0;
    var range = Math.ceil(30 / numColors);
    var frame = [];

    for (var pixel = 0; pixel < 30; pixel++) {
      if ((pixel % range) === 0) {
        var color = palette[index];
        index++;
      }
      //color data is in BGR order for strip
      let data = {
        pixel: pixel,
        red: color[1],
        green: color[2],
        blue: color[0]
      }
      frame.push(data);
    }
    socket.emit('ledstrip:updatepixelframe', frame);
    console.log(`palette: ${palette}`);
  }
  $scope.clear = function() {
    socket.emit('ledstrip:clear');
    console.log('LED STRIP CLEAR');
  };
  $scope.show = function() {
    socket.emit('ledstrip:show');
    console.log('LED STRIP SHOW');
  };
  $scope.ledstriphello = function() {
    socket.emit('ledstrip:hello');
    console.log('LED STRIP HELLO');
  };
  $scope.alertLOW = function() {
    socket.emit('ledstrip:alertLOW');
    console.log('LED STRIP alertLOW');
  };
  $scope.alertHIGH = function() {
    socket.emit('ledstrip:alertHIGH');
    console.log('LED STRIP alertHIGH');
  };
  $scope.updateColor = function(cc) {
    let data = {
      pixel: $scope.pix,
      red: $scope.color.red,
      green: $scope.color.green,
      blue: $scope.color.blue
    }
    socket.emit('ledstrip:setclearshowpixelcolor', data);
  };
  $scope.updatePixel = function(data) {
    console.log("update pixel ");
    let ledstrip = {
      pixel: data.pixel,
      red: data.red,
      green: data.green,
      blue: data.blue
    }
    socket.emit('ledstrip:setpixelcolor', ledstrip);
    socket.emit('ledstrip:show');
  };
  $scope.updatePixels = function(pixels) {
    let data = {
      pixel: pixels,
      red: $scope.color.red,
      green: $scope.color.green,
      blue: $scope.color.blue
    }
    setTimeout(function() {
      //socket.emit('ledstrip:clear');
      socket.emit('ledstrip:setclearshowpixelcolor', data);
      //socket.emit('ledstrip:show');
    }, 0);
  };
  $scope.setLowAlarm = function(data) {
    socket.emit('temp:setLowAlarm', $scope.temperature.lowAlarm);
  };
  $scope.setHighAlarm = function(data) {
    socket.emit('temp:setHighAlarm', $scope.temperature.highAlarm);
  };
  $scope.ledstrip = {
    pixel: 0,
    red: 0,
    green: 0,
    blue: 0
  }
  $scope.temperature = {
    curTemp: 0,
    highAlarm: 0,
    lowAlarm: 0,
    minTemp: 10000,
    maxTemp: 0,
    enableLOW: false,
    enableHIGH: false
  };
});

app.controller("lineCtrl", function($scope, socket) {
  var timeFormat = 'MM/DD/YYYY HH:mm:ss';
  var color = Chart.helpers.color;

  function newDateString(seconds) {
    return moment().add(seconds, 's').format();
  }

  function newTimestamp(days) {
    return moment().add(days, 'd').unix();
  }
  $scope.labels = [];
  $scope.series = ['Temp', 'High', 'Low'];
  $scope.data = [
    [],
    [],
    []
  ];
  $scope.onClick = function(points, evt) {
    console.log(points, evt);
  };
  socket.on('sendTemp', function(data) {
    $scope.data[0].push(data.curTemp);
    $scope.data[1].push($scope.temperature.lowAlarm);
    $scope.data[2].push($scope.temperature.highAlarm);
    $scope.labels.push(moment().format());
  });
  $scope.onClick = function(points, evt) {
    console.log(points, evt);
  };
  $scope.options = {
    responsive: true,
    animation: {
            duration: 0, // general animation time
        },
    title: {
      display: true,
      text: "Temperature Monitoring Data"
    },
    scales: {
      xAxes: [{
        type: "time",
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Timestamp'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Temp (C)'
        }
      }]
    },
  };
});
