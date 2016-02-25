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
  viewModel.changeCity(city.place);
};

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.cityName = ko.observable("Select a City"); 
    this.trends = ko.observableArray();
    this.happyTweets = ko.observableArray();
    this.sadTweets = ko.observableArray();

    this.changeCity = function(cityName) {
      this.cityName(cityName);

      //call api to get trends
      var cityUrl = "/api/city/" + cityName
      $.ajax({
          url: cityUrl,
          success: function(result){
            var trendResult = JSON.parse(result);
            //sort results to get top 10
            trendList = trendResult[0].trends;

            for (var i = 0; i < trendList.length; i++){
              if(trendList[i].tweet_volume === null){
                trendList.splice(i, 1);
                i--;
              }
              else {
                trendList[i].tweet_volume_scaled = parseInt(trendList[i].tweet_volume / 30000);
              }

            }
            trendList.sort(function(a, b) {
                return parseFloat(a.tweet_volume) - parseFloat(b.tweet_volume);
            });

            trendList.reverse();

            if (trendList.length > 10){
              trendList = trendList.slice(0,9);
            }
            //set trends variable
            viewModel.trends(trendList);
            //console.log(trendList);
          }
      });
    }

    this.showTweets = function(trendQuery){
      //call api to get tweets
      var happyUrl = "/api/city/" + viewModel.cityName() + "/" + trendQuery + "/:)"
      var sadUrl = "/api/city/" + viewModel.cityName() + "/"+ trendQuery + "/:("
      $.ajax({
          url: happyUrl,
          success: function(result){
            var tweetResult = JSON.parse(result);
            console.log(tweetResult);
            tweetList = tweetResult.statuses;
            if (tweetList.length > 5){
              tweetList.slice(0,4);
            }
            viewModel.happyTweets(tweetList);
            console.log(tweetList);
          }
      });
      $.ajax({
          url: sadUrl,
          success: function(result){
            var tweetResult = JSON.parse(result);
            console.log(tweetResult);
            tweetList = tweetResult.statuses;
            if (tweetList.length > 5){
              tweetList.slice(0,4);
            }
            viewModel.sadTweets(tweetList);
          }
      });
    }
      
}

// Activates knockout.js
viewModel = new AppViewModel();
ko.applyBindings(viewModel);

