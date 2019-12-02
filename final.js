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
    button3(all)
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
var screen = {width: 1000, height:600}

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
  var description2 = ["<0.2","0.2-0.4","0.4-0.6","0.6-0.8", "0.8-1", ">1","Undefined"];  
          
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
.domain([0,1.2])


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

var button3=function(all)
{
        d3.select("body")
.append("button")
.attr("class","button3")
.text("Findings Based on Comparing Two Maps and the Misconception ")
.on("click",function()
   {removethings(),findings(all)})
}

var removethings=function()
{d3.selectAll("svg").remove();
d3.selectAll(".compare").remove()}

var findings=function(all)
{
  d3.select("body")
              .append("div")
                  .attr("class", "compare")
          

   addli= d3.select(".compare")
    .append("ol")

    addli.append("li")
    .text("The richer countries might not have a higher return on investing in capital.")
    
    addli.append("li")
    .text("Countries with higher return(1% increase in investing capital will bring a >1% growth in real GDP per capita) on investing in capital are mostly not developed countries.")
    
        d3.select(".compare")
    .append("button")
    .attr("class","button4")
    .text("Misconception")
    .on("click",function()
       {drawmis(all)})
   
}

//misconception


var drawmis=function(all)
{
    var screen2 = {width:1400,height:800}
var margins={top:10,right:50,bottom:50,left:50}

d3.select("body")
              .append("svg")
              .attr("class","svg2")
              .attr("width", screen2.width)
              .attr("height", screen2.height);
    
    
    d3.select(".svg2")
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width=screen.width-margins.left-margins.right
    var height=screen.height-margins.top-margins.bottom
    
    var xScale=d3.scaleLinear()
    .domain([0,600000])
    .range([0,width])
    
    var yScale=d3.scaleLinear()
    .domain([0,140000])
    .range([height,0])
    
        var cScale=d3.scaleOrdinal
    
    var xAxis=d3.axisBottom(xScale)
    var yAxis=d3.axisLeft(yScale)
    
        d3.select(".svg2")
    .append("g")
    .classed("axis",true);
    
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
        d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(50,"+margins.top+")")
    .call(yAxis)
    
    d3.select("#graph")
    .selectAll("circle")
    .data(all.features)
    .enter()
    .append("circle")
       .attr("fill","red")
    .attr("r",7)
    .attr("cx",function(d)
    {
      return xScale(d.properties.economicdata.capitalpercapita17);
    })
    .attr("cy",function(d)
    {
      return yScale(d.properties.economicdata.rgdppercapita17);
    })
}


