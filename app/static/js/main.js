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
        "click":  function(d) { 
          svg.selectAll("circle").style("fill", "#F5A75C");
          d3.select(this).style("fill", "#4372A0");
          showCity(d) }, 
      })
     .style("fill", "#F5A75C")
     .style("opacity", 0.75);
  
});
function showCity(city) {
  viewModel.changeCity(city.place);
};

function AppViewModel() {
    this.cityName = ko.observable("Select a City"); 
    this.trends = ko.observableArray();
    this.happyTweets = ko.observableArray();
    this.sadTweets = ko.observableArray();

    this.changeCity = function(cityName) {
      this.cityName(cityName);
      var cityUrl = "/api/city/" + cityName
      $.ajax({
          url: cityUrl,
          success: function(result){
            var trendResult = JSON.parse(result);
            if (trendResult.length > 0) {
              trendList = trendResult[0].trends;
              for (var i = 0; i < trendList.length; i++){
                if(trendList[i].tweet_volume !== null){
                  trendList[i].tweet_volume_scaled = parseInt(trendList[i].tweet_volume / 30000);
                }
              }
              if (trendList.length > 10){
                trendList = trendList.slice(0,9);
              }
              viewModel.trends(trendList);
            } else {
              viewModel.trends([]);  
            }
          }
      });
    }

    this.showTweets = function(trendQuery){
      //call api to get tweets
      var happyUrl = "/api/city/" + viewModel.cityName().trim() + "/" + trendQuery.trim() + "/:)";
      var sadUrl = "/api/city/" + viewModel.cityName().trim() + "/"+ trendQuery.trim() + "/:(";
      $.ajax({
          url: happyUrl,
          datatype: 'json',
          success: function(result){
            $( ".happy-tweet").remove();
            $( ".happy-face").remove();
            var statuses = result.statuses;
            bound = Math.min(3, statuses.length);
            for(var i=0; i < bound; i++){
              $('.happy-tweets').append("<div class='row'><div class='happy-face col-sm-1'><img src='https://twemoji.maxcdn.com/72x72/1f604.png'></div><div class='col-sm-11 happy-tweet' id='happy-"
               + statuses[i].id_str
                + "'></div></div>");
              twttr.widgets.createTweet(statuses[i].id_str,document.getElementById("happy-" + statuses[i].id_str));
            }
          }
      });
      $.ajax({
          url: sadUrl,
          datatype: 'json',
          success: function(result){
            $( ".sad-tweet").remove();
            $( ".sad-face").remove();
            var statuses = result.statuses;
            bound = Math.min(3, statuses.length);
            for(var i=0; i < bound; i++){
              $('.sad-tweets').append("<div class='row'><div class='sad-face col-sm-1'><img src='https://twemoji.maxcdn.com/72x72/1f61e.png'></div><div class='sad-tweet' id='sad-"
               + statuses[i].id_str
                + "'></div></div>");
              twttr.widgets.createTweet(statuses[i].id_str,document.getElementById("sad-" + statuses[i].id_str));
            }
          }
      });
    }
      
}

viewModel = new AppViewModel();
ko.applyBindings(viewModel);

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));

