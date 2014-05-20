angular.module('freqbuddiez.main.note', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/notes', {
      templateUrl: 'note/note.tpl.html',
      controller: 'NoteController'
    });
})
.controller('NoteController', function ($scope) {
  $scope.notes = [];
  $scope.makesynth = function() {
    oneSynth();
  };
  $scope.makeDrum = function() {
    drumUI();
  }
});




var synthUI = function() {
  console.log("what>?");

  var synthContext = new webkitAudioContext();
  var analyser = synthContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.9;
  analyser.fftSize = 2048;
  var freqDomain = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqDomain);
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
      gainNode = synthContext.createGainNode();
      oscillator.type = 'triangle';
      oscillator.connect(gainNode);
      oscillator.frequency.value = freq || 261.63;
      gainNode.connect(analyser)
      analyser.connect(synthContext.destination);
      oscillator.start(0);
      d3.selectAll("circle").filter(":nth-child(" + noteIndex + ")").classed("playing", true)
      setTimeout(3000, function() {
        oscillator.stop(0);
      })
     notes[freq].pressed = true;
     oscillators[freq] = oscillator;
     console.log(oscillators);
     var freqDomain = new Uint8Array(analyser.frequencyBinCount);
      console.log(analyser.getByteFrequencyData(freqDomain));
      console.log(synthContext);
    }
  }

  var endNote = function(freq) {
    if (oscillators[freq]) {
      var oscillator = oscillators[freq];
      var noteIndex = notes[freq].idx;
      oscillator.stop(0);
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

  d3.select(".synth")
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

  // window.setInterval(1000, function(){
    
  // });


};

var oneSynth = _.once(synthUI);

var drumUI = function () {
  var drums = [1,2,3,4,5]
  console.log("drumdrumdrum");
  var sine1 = T("sin", {freq:140, mul:0.9});
  var sine2 = T("sin", {freq:220, mul:0.5});
  d3.select(".drum")
  .append("svg")
  .attr("width", 200)
  .attr("height", 200)
  .append('g')
  .selectAll('circle')
  .data(drums)
  .enter()
  .append("circle")
  .attr("class", "drumkey")
  .attr("r", 40)
  .attr("cx", 100)
  .attr("cy", 100);

  var makeSineDrumPlayer = function(s1, s2, s3, ring) {
    var drum;
    var defaultSine = T("sin", {freq:120, mul:0.1});
    s1 = s1 || defaultSine;
    s2 = s2 || defaultSine;
    s3 = s3 || defaultSine;
    ring = ring || 200;
    T("perc", {r:ring}, s1, s2, s3).on("ended", function() {
     this.pause();
    }).bang().play();
  }


  var playDrum = function(s1, s2, s3, ring) {
    var sine1 = T("sin", {freq:140, mul:0.9});
    var sine2 = T("sin", {freq:220, mul:0.5});

    T("perc", {r:200}, sine1, sine2).on("ended", function() {
     this.pause();
    }).bang().play(); 
  }
  var playDrum2 = function(s1, s2, s3, ring) {
    var sine1 = T("sin", {freq:80, mul:0.9});
    var sine2 = T("sin", {freq:40, mul:0.5});

    T("perc", {r:200}, sine1, sine2).on("ended", function() {
     this.pause();
    }).bang().play(); 
  }
  var playDrum3 = function(s1, s2, s3, ring) {
    var sine1 = T("sin", {freq:40, mul:0.9});
    var sine2 = T("sin", {freq:120, mul:0.5});

    T("perc", {r:200}, sine1, sine2).on("ended", function() {
     this.pause();
    }).bang().play(); 
  }
    // var defaultSine = T("sin", {freq:120, mul:0.1});
    // s1 = s1 || defaultSine;
    // s2 = s2 || defaultSine;
    // s3 = s3 || defaultSine;
    // ring = ring || 200;
    // T("perc", {r:ring}, s1, s2, s3).on("ended", function() {
    //  this.pause();
    // }).bang().play();

  KeyboardJS.on('x', playDrum);
  KeyboardJS.on('c', playDrum2);
  KeyboardJS.on('v', playDrum3);


}


var drumSound = function() {

}