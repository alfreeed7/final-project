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
button1(all)
    button2(all)

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

  var colorSet = ["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f","#006d2c","#ccc"];
  var description = ["0-$5000","$5000-$10000","$10000-$15000","$15000-$20000", "$20000-$25000", ">$25000","Undefined"];    
    
      var legend = svg.append("g")
                  .attr("class", "legend")

  legend.selectAll("rect")
         .data(colorSet)
         .enter()
         .append("rect")
         .attr("x", 100)
         .attr("y", function(d, i) {return 600 + i*20;})
         .attr("width", 10.5)
         .attr("height", 10.5)
         .attr("fill", function(d) {return d;});

  legend.selectAll("text")
        .data(description)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", function(d, i) {return 610 + i*20})
        .text(function(d) {return d;})
        .attr("font-size", 15)
        .attr("font-style", "italic")
        .attr("font-weight", "bold");

}

var color = d3.scaleQuantize()
.range(["#edf8fb", "#ccece6",
"#99d8c9", "#66c2a4", "#2ca25f","#006d2c"])
.domain([0,30000])


var drawmap2=function(all) 
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

var value = d.properties.economicdata.ratio;
if (value) 
{
return color2(value);
} 
        else 
        {
return "#ccc";
}   
})

    var colorSet2 = ["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f","#006d2c","#ccc"];
  var description2 = ["<0.5","0.5-1","1-1.5","1.5-2", "2-2.5", ">2.5","Undefined"];  
          
    var legend = svg.append("g")
                  .attr("class", "legend")
    
      legend.selectAll("rect")
         .data(colorSet2)
         .enter()
         .append("rect")
         .attr("x", 100)
         .attr("y", function(d, i) {return 600 + i*20;})
         .attr("width", 10.5)
         .attr("height", 10.5)
         .attr("fill", function(d) {return d;});

  legend.selectAll("text")
        .data(description2)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", function(d, i) {return 610 + i*20})
        .text(function(d) {return d;})
        .attr("font-size", 15)
        .attr("font-style", "italic")
        .attr("font-weight", "bold");

}

var color2 = d3.scaleQuantize()
.range(["#edf8fb", "#ccece6",
"#99d8c9", "#66c2a4", "#2ca25f","#006d2c"])
.domain([0,3])


var button1=function(all)
{
    d3.select("body")
.append("button")
.attr("class","button1")
.text("Based on Real GDP per capita")
.on("click",function()
   {removethings(),drawmap(all)})
}


var button2=function(all)
{d3.select("body")
.append("button")
.attr("class","button2")
.text("Growth of Real GDP per Capita/Growth of Capital per capita")
.on("click",function()
   {removethings(),drawmap2(all)})}

var button3=
        d3.select("body")
.append("button")
.attr("class","button3")
.text("Findings Based on Comparing Two Maps and the Misconception ")
.on("click",function()
   {removethings(),findings()})

var removethings=function()
{d3.selectAll("svg").remove();}

var findings=function()
{
    var svg = d3.select("body")
              .append("svg")
              .attr("width", screen.width)
              .attr("height", screen.height)
     
          var compare = svg.append("g")
                  .attr("class", "compare")
          
       var addli= compare.selectAll("ol")
.append("ol")
            .attr("x", 120)
        .attr("y", 120)

       addli.append("li")
    .text("hi")
    
//No order list    
    
    
//    
//    .append("g")
//    .append("ol")
//        .attr("x", 120)
//        .attr("y", 120)
//    .attr("class","explain")
//
//svg.append("li")
//    .text("hello")
//            .attr("font-size", 15)
//        .attr("font-style", "italic")
//        .attr("font-weight", "bold");
//
//
//    
//svg.append("li")
//    .text("hi")
//
//    svg.append("li")
//    .text("ok")





}