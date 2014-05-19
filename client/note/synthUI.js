
var synthkeys = [],
oscillator,
gainNode,
boardWidth = 400,
boardHeight = 400;
for (var i = 0; i < 8; i++){
  synthkeys.push({"cx": 20*i + 10, "cy": 10*i + 10, 'r': 10});
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
  .attr("cy", function(d){return d["cy"];});



var synthContext = new webkitAudioContext();

var playNote = function() {
  oscillator = synthContext.createOscillator();
  gainNode = synthContext.createGainNode();
  oscillator.type = 'triangle';
  oscillator.connect(gainNode);
  oscillator.frequency.value = 261.63;
  gainNode.connect(synthContext.destination);
  oscillator.start(0);
}

var endNote = function() {
  oscillator.stop(0);
}

//play one note on keypress
//stop on keyup
KeyboardJS.on('a', function() {
    _.once(function(){
      console.log('you pressed a!');
      playNote();
    })();
}, function() {
    console.log('you released a!');
    endNote();
});