
var synthkeys = [],
boardWidth = 400,
boardHeight = 400;
for (var i = 0; i < 8; i++){
  synthkeys.push({"cx": 20*i + 5, "cy": 10*i + 5, 'r': 10});
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
