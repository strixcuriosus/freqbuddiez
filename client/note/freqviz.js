var WIDTH = 256;
var HEIGHT = 128;
var audio;

var mycanvas = document.createElement("canvas");
mycanvas.id = "mycanvas"; document.body.appendChild(mycanvas);
// Interesting parameters to tweak!
var SMOOTHING = 0.8;
var FFT_SIZE = 2048;

var context = synthContext || new webkitAudioContext();

 if (document.getElementsByTagName('video').length > 0) {
    var audio = document.getElementsByTagName('video')[0];
  } else {
    console.log('no video!!!');
  }

  var analyser =  analyser || context.createAnalyser();
  var source = gainNode ||context.createMediaElementSource(audio);
  var proc = synthContext.createScriptProcessor(2048, 2, 2);
  
  source.connect(proc);
  proc.connect(analyser);
  proc.onaudioprocess = function(event)
    {
      var audio_data = event.inputBuffer.getChannelData(0)|| new Float32Array(2048);
      if(audio_data[0] !== audio_data[1] && audio_data[1] !== audio_data[2]) {
        console.log('proc has data')
        // console.log('streamers flying!');
        // socket.emit('sounds', {sound: audio_data});
        
      }
        // send audio_data to server
    }

  // source.connect(analyser);

  analyser.connect(context.destination); //speakers

   var visualizer = function(){
    var canvas = mycanvas;
    var drawContext = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    drawContext.fillStyle = 'black';
    drawContext.fillRect(0,0,WIDTH,HEIGHT);

    analyser.smoothingTimeConstant = SMOOTHING;
    analyser.fftSize = FFT_SIZE;

    // draw frequency domain
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    // console.log(freqDomain);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      var value = freqDomain[i];
      var percent = value / 256;
      var height = HEIGHT * percent;
      var offset = HEIGHT - height - 1;
      var barWidth = WIDTH/analyser.frequencyBinCount;
      var hue = i/analyser.frequencyBinCount * 360;
      drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      drawContext.fillRect(i * barWidth, offset, barWidth, height);
    }
    // draw time domain
    analyser.getByteTimeDomainData(freqDomain);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      var value = freqDomain[i];
      var percent = value / 256;
      var height = HEIGHT * percent;
      var offset = HEIGHT - height - 1;
      var barWidth = WIDTH/analyser.frequencyBinCount;
      drawContext.fillStyle = 'white';
      drawContext.fillRect(i * barWidth, offset, 1, 2);
    }

    requestAnimFrame(visualizer);

  };

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
  })();

  visualizer();

////////////////////////////////////////////////////
//     var proc = synthContext.createScriptProcessor(2048, 2, 2)
//     source.connect(proc)
//     proc.connect(******context.destination)
//     proc.onaudioprocess = function(event)
//     {
//         var audio_data = event.inputBuffer.getChannelData(0)|| new Float32Array(2048)
//         console.log(audio_data)
//         // send audio_data to server
//       console.log('streamers flying!');
//     }
// // }var WIDTH = 1024;
// var HEIGHT = 768;
// var audio;

// var mycanvas = document.createElement("canvas");
// mycanvas.id = "mycanvas"; document.body.appendChild(mycanvas);
// // Interesting parameters to tweak!
// var SMOOTHING = 0.89;
// var FFT_SIZE = 2048;

// var context = synthContext || new webkitAudioContext();

//  if (document.getElementsByTagName('video').length > 0) {
//     var audio = document.getElementsByTagName('video')[0];
//   } else {
//     console.log('no video!!!');
//   }

//   var analyser = context.createAnalyser();
//   var source = gainNode ||context.createMediaElementSource(audio);
//   var proc = synthContext.createScriptProcessor(2048, 2, 2);
  
//   source.connect(proc);
//   proc.connect(analyser);
//   proc.onaudioprocess = function(event)
//     {
//       var audio_data = event.inputBuffer.getChannelData(0)|| new Float32Array(2048);
//       if(audio_data[0] !== audio_data[1] && audio_data[1] !== audio_data[2]) {
//         console.log(audio_data)
//         console.log('streamers flying!');
//         socket.emit('sounds', {sound: audio_data});
        
//       }
//         // send audio_data to server
//     }

//   // source.connect(analyser);

//   analyser.connect(context.destination); //speakers

//    var visualizer = function(){
//     var canvas = mycanvas;
//     var drawContext = canvas.getContext("2d");

//     canvas.width = WIDTH;
//     canvas.height = HEIGHT;

//     drawContext.fillStyle = 'black';
//     drawContext.fillRect(0,0,WIDTH,HEIGHT);

//     analyser.smoothingTimeConstant = SMOOTHING;
//     analyser.fftSize = FFT_SIZE;

//     // draw frequency domain
//     var freqDomain = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteFrequencyData(freqDomain);
//     // console.log(freqDomain);
//     for (var i = 0; i < analyser.frequencyBinCount; i++) {
//       var value = freqDomain[i];
//       var percent = value / 256;
//       var height = HEIGHT * percent;
//       var offset = HEIGHT - height - 1;
//       var barWidth = WIDTH/analyser.frequencyBinCount;
//       var hue = i/analyser.frequencyBinCount * 360;
//       drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
//       drawContext.fillRect(i * barWidth, offset, barWidth, height);
//     }
//     // draw time domain
//     analyser.getByteTimeDomainData(freqDomain);
//     for (var i = 0; i < analyser.frequencyBinCount; i++) {
//       var value = freqDomain[i];
//       var percent = value / 256;
//       var height = HEIGHT * percent;
//       var offset = HEIGHT - height - 1;
//       var barWidth = WIDTH/analyser.frequencyBinCount;
//       drawContext.fillStyle = 'white';
//       drawContext.fillRect(i * barWidth, offset, 1, 2);
//     }

//     requestAnimFrame(visualizer);

//   };

//   // shim layer with setTimeout fallback
//   window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame    ||
//     window.oRequestAnimationFrame      ||
//     window.msRequestAnimationFrame     ||
//     function( callback ){
//     window.setTimeout(callback, 1000 / 60);
//   };
//   })();

//   visualizer();

////////////////////////////////////////////////////
//     var proc = synthContext.createScriptProcessor(2048, 2, 2)
//     source.connect(proc)
//     proc.connect(******context.destination)
//     proc.onaudioprocess = function(event)
//     {
//         var audio_data = event.inputBuffer.getChannelData(0)|| new Float32Array(2048)
//         console.log(audio_data)
//         // send audio_data to server
//       console.log('streamers flying!');
//     }
// }