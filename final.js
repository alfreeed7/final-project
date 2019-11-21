mappromise=d3.json("world-countries.json")
datapromise=d3.csv("final.csv")

mappromise.then
(function(country)
{
   console.log("country",country)
    drawmap(country)
})

datapromise.then
(
function(stat)
    {console.log("stat",stat)}
)


var drawmap=function(country) 
{
var screen = {width: 1500, height:1000}

 var projection = d3.geoEqualEarth()
                     .translate([screen.width/2, screen.height/2])
                     .scale([300]);

var path=d3.geoPath(projection)

  var svg = d3.select("body")
              .append("svg")
              .attr("width", screen.width)
              .attr("height", screen.height);

    svg.selectAll("path")
    .data(country.features)
    .enter()
    .append("path")
    .attr("d",path)
}


