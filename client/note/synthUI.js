
var synthUI = function() {


var synthContext = new webkitAudioContext();

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
    gainNode.connect(synthContext.destination);
    oscillator.start(0);
    d3.selectAll("circle").filter(":nth-child(" + noteIndex + ")").classed("playing", true)
    setTimeout(3000, function() {
      oscillator.stop(0);
    })
   notes[freq].pressed = true;
   oscillators[freq] = oscillator;
   console.log(oscillators);
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
        console.log('you pressed' + key);
        playNote(freq);
      })();
  }, function() {
      console.log('you released' + key);
      endNote(freq);
  });
}

_.each(keyboardKeys, setKeyCtrl);

var synthkeys = [],
oscillator,
gainNode,
boardWidth = 400,
boardHeight = 400;
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



}();

var drumUI = function () {
  console.log("drumdrumdrum");
  var sine1 = T("sin", {freq:140, mul:0.9});
  var sine2 = T("sin", {freq:220, mul:0.5});
  d3.select(".drum")
  .append("svg")
  .attr("width", 200)
  .attr("height", 200)
  .append('g')
  .selectAll('circle')
  .enter().append("circle").attr("class", "drum")
  .attr("r", 40)
  .attr("cx", 100)
  .attr("cy", 100)


  var playDrum = function() {
    T("perc", {r:500}, sine1, sine2).on("ended", function() {
     this.pause();
    }).bang().play(); 
  }

  KeyboardJS.on('x', playDrum);

}

