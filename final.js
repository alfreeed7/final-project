
mappromise=d3.json("world-countries.json")
datapromise=d3.csv("final.csv")


Promise.all([mappromise, datapromise])
       .then(function(values)
       {
         var  all= values[0];
         var economics = values[1];
    
    console.log("all", all)
    
      var getdata = {}

  economics.forEach(function(element)
         {
           getdata[element.countrycode] = element; 
         })
    
   all.features.forEach(function(feature)
         {
           feature.properties.economicdata = getdata[feature.properties.iso_a3];
         })

    drawmap(all)
})

var drawmap=function(all) 
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
    .data(all.features)
    .enter()
    .append("path")
    .attr("d",path)
    .attr("stroke", "#000000")
    
    .style("fill", function(d) {

var value = d.properties.economicdata.rgdppercapita17;
if (value) 
{
return color(value);
} 
        else 
        {
return "#ccc";
}   
})


}

var color = d3.scaleQuantize()
.range(["#edf8fb", "#ccece6",
"#99d8c9", "#66c2a4", "#2ca25f","#006d2c"])
.domain([0,30000])

var button1=
    d3.select("body")
.append("button")
.attr("class","button1")
.text("Based on Real GDP per capita")

var button2=
        d3.select("body")
.append("button")
.attr("class","button2")
.text("Based on Capital per capita")






