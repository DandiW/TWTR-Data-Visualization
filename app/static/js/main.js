var w = 1000;
var h = 700;
var svg = d3.select(".map")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
var projection = d3.geo.albersUsa()
                   .translate([w/2, h/2])
                   .scale([1200]);
var path = d3.geo.path().projection(projection);
d3.json("static/img/us-states.json", function(json) {
  svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path").style("fill", "#D7DBF6")
     .attr("d", path)
     .style("fill", "#F5F6FF");
});

d3.csv("static/img/us-cities.csv", function(data) {
  
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
       return projection([d.lon, d.lat])[0];
     })
     .attr("cy", function(d) {
       return projection([d.lon, d.lat])[1];
     })
     .attr("r", function(d) {
      return Math.sqrt(parseInt(d.population) * 0.00015);
     })
     .on({
        "mouseover": function(d) { console.log(d.place) },
        "click":  function(d) { 
          svg.selectAll("circle").style("fill", "#F5A75C");
          d3.select(this).style("fill", "#4372A0");
          showCity(d) }, 
      })
     .style("fill", "#F5A75C")
     .style("opacity", 0.75);
  
});
function showCity(city) {
  alert(city.place);
};

// ---------------add after this-------------------


