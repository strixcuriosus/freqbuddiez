var synthContext = new webkitAudioContext();
  var analyser = synthContext.createAnalyser();
  var gainNode = synthContext.createGainNode();

  analyser.fftSize = 128;
  analyser.smoothingTimeConstant = 0.8;
  gainNode.connect(analyser);
  gainNode.gain.value = 1;
  analyser.connect(synthContext.destination);


  // var freqDomain = new Uint8Array(analyser.frequencyBinCount);
  //     analyser.getByteFrequencyData(freqDomain);
  var freqDomain = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(freqDomain);
  var noteFreqs = [261.63, 293.66, 329.63, 349.23, 392.00];
  var keyboardKeys = ['a', 's', 'd', 'f', 'g'];

  var notes = {};
  for (var i = 0; i < keyboardKeys.length; i++) {
    notes[noteFreqs[i]] = {};
    notes[noteFreqs[i]].key = keyboardKeys[i];
    notes[noteFreqs[i]].pressed = false;
    notes[noteFreqs[i]].idx = i + 1;
  }

  var oscillators = {};
  var playNote = function(freq) {
    var oscillator, noteIndex;
    if (notes[freq].pressed || oscillators[freq]) {
      // oscillator.stop(0);
      return;
    } else {
      console.log("playing a note");
      noteIndex = notes[freq].idx;
      oscillator = synthContext.createOscillator();
      // gainNode = synthContext.createGainNode();
      oscillator.type = oscillator.TRIANGLE;
      oscillator.connect(gainNode);
      oscillator.frequency.value = freq || 261.63;
      oscillator.detune.value = 24 * 100;
      // gainNode.connect(analyser)
      // analyser.connect(synthContext.destination);
      oscillator.noteOn(0);
      d3.selectAll("circle").filter(":nth-child(" + noteIndex + ")").classed("playing", true)
      // setTimeout(3000, function() {
      //   oscillator.noteOff(0);
      // })
     notes[freq].pressed = true;
     oscillators[freq] = oscillator;
    //  console.log(oscillators);
    //  var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    //   console.log("freqdata");
    //   console.log(analyser.getByteFrequencyData(freqDomain));
    //   console.log(synthContext);
    }
  }

  var endNote = function(freq) {
    if (oscillators[freq]) {
      var oscillator = oscillators[freq];
      var noteIndex = notes[freq].idx;
      oscillator.noteOff(0);
      oscillator.disconnect();
      oscillators[freq] = null;
      notes[freq].pressed = false;
      d3.selectAll("circle").filter(":nth-child(" + noteIndex + ")").classed("playing", false);
    }
  }


  // d3.selectAll("circle").filter(":nth-child(3)").classed("playing", true)

  // d3.selectAll("circle").filter(":nth-child(3)").classed("playing", false)
  //play one note on keypress
  //stop on keyup
  // KeyboardJS.on('a', function() {
  //     _.once(function(){
  //       console.log('you pressed a!');
  //       playNote();
  //     })();
  // }, function() {
  //     console.log('you released a!');
  //     endNote();
  // });

  var setKeyCtrl = function(key, index) {
    var freq = noteFreqs[index];
    KeyboardJS.on(key, function() {
        _.once(function(){
          // console.log('you pressed' + key);
          playNote(freq);
        })();
    }, function() {
        // console.log('you released' + key);
        endNote(freq);
    });
  }

  _.each(keyboardKeys, setKeyCtrl);

  var synthkeys = [],
  oscillator,
  gainNode,
  boardWidth = 200,
  boardHeight = 100;
  for (var i = 0; i < 5; i++){
    synthkeys.push({"cx": 20*i + 10, "cy": 10*i + 10, 'r': 10, 
  'note': keyboardKeys[i], 'playing' : false
    });
  };

  d3.select(".synthy")
    .append("svg")
    .attr("width", boardWidth)
    .attr("height", boardHeight)
    .append('g')
    .selectAll('circle')
    .data(synthkeys)
    .enter().append("circle").attr("class", "synthkey")
    .attr("r", function(d){return d.r;})
    .attr("cx", function(d){return d["cx"];})
    .attr("cy", function(d){return d["cy"];})
    .attr("note", function(d){return d["note"];});







// window.requestAnimationFrame = (function(){
// return window.requestAnimationFrame  ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame    ||
//   window.oRequestAnimationFrame      ||
//   window.msRequestAnimationFrame     ||
//   function(callback){
//   window.setTimeout(callback, 1000 / 60);
// };
// })();

// var freqDomain = new Uint8Array(analyser.frequencyBinCount);
// analyser.getByteFrequencyData(freqDomain);
// console.log(freqDomain);
// for (var i = 0; i < analyser.frequencyBinCount; i++) {
//   var value = freqDomain[i];
//   // console.log(value);
//   var percent = value / 256;
//   var height = HEIGHT * percent;
//   var offset = HEIGHT - height - 1;
//   var barWidth = WIDTH/analyser.frequencyBinCount;
//   var hue = i/analyser.frequencyBinCount * 360;
//   drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
//   drawContext.fillRect(i * barWidth, offset, barWidth, height);
// }

// // setInterval( function(){
// //   var data = new Uint8Array(128); 
// //   console.log(analyser)
// //   console.log(analyser.getByteFrequencyData)
// //   console.log(analyser.getFloatFrequencyData(data));
// //   console.log('hmm ^^^^^ ? ')}, 1000);



 


// var synthContext = new webkitAudioContext();
//   var analyser = synthContext.createAnalyser();
//   var gainNode = synthContext.createGainNode();

//   analyser.fftSize = 128;
//   analyser.smoothingTimeConstant = 0.8;
//   gainNode.connect(analyser);
//   gainNode.gain.value = 1;
//   analyser.connect(synthContext.destination);

// var context = synthContext;
// var sourceNode = context.createOscillator();
// sourceNode.type = sourceNode.TRIANGLE; 
// sourceNode.frequency.value = 440;
// // sourceNode.noteOn(0);
// var analy = context.createAnalyser();
// sourceNode.connect(analy);
// analy.connect(context.destination);

// // Create arrays to store sound data
// var fFrequencyData = new Float32Array(analy.frequencyBinCount);
// var bFrequencyData = new Uint8Array(analy.frequencyBinCount);

// // Retrieve data
// analy.getFloatFrequencyData(fFrequencyData);
// bFrequencyData = analy.getByteFrequencyData(bFrequencyData);
// analy.getByteTimeDomainData(bFrequencyData);
// for (var i = 0; i < bFrequencyData.length; i++) {
//     // Do something with sound data
//     console.log(bFrequencyData[i]);
// }



