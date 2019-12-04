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
  .attr("class","svg1")
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
  var description = ["0-$5000","$5000-$10000","$10000-$15000","$15000-$20000", "$20000-$25000", ">$25000 (developed countries)","Undefined"];    
    
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
  .attr("class","svg1")
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
d3.selectAll(".compare").remove();
d3.selectAll("p").remove()}

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
    var screen2 = {width:800,height:500}
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
    
    var width=screen2.width-margins.left-margins.right
    var height=screen2.height-margins.top-margins.bottom
    
    var xScale=d3.scaleLinear()
    .domain([0,400000])
    .range([0,width])
    
    var yScale=d3.scaleLinear()
    .domain([0,90000])
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
    
    d3.select(".compare")
    .append("p")
    .attr("class","mis")
    .text("The misconception mainly comes from this graph. The x-axis is capital per capita and  the y-axis is real GDP per capita. Which being said, this graph can display a relationship between those two. So, it is easy for people to conclude that increasing capital can help the economy grow. However, this conclusion elminate many other facts.")
    
    d3.select(".compare")
    .append("button")
    .attr("class", "dbutton")
    .text("Debug the Misconception")
    .on("click",function()
       {
        removethings2(),setup(all)
    })
    

}

var removethings2=function()
{d3.selectAll(".svg2").remove();
d3.selectAll(".compare").remove()}

var setup=function(all)
{
      d3.select("body")
              .append("div")
                  .attr("class", "compare")
    
       d3.select(".compare")
    .append("button")
    .attr("class","button5")
    .text("Top 33% Poorest Countries")
    .on("click",function()
       {
           removethings3(),setup1(all)
       })
    
    
        d3.select(".compare")
    .append("button")
    .attr("class","button6")
    .text("33%~66.7% Richest Countries")
        .on("click",function()
       {
           removethings3(),setup2(all)
       })
    
    
        d3.select(".compare")
    .append("button")
    .attr("class","button7")
    .text("Top 33% Richest Countries")
            .on("click",function()
       {
           removethings3(),setup3(all)
       })
    
    
            d3.select(".compare")
    .append("button")
    .attr("class","button8")
    .text("Final Conclusion")
    .on("click",function()
       {
              removethings3(),setup4()  
            })
    
}


var removethings3=function()
{d3.selectAll("p").remove();
d3.selectAll(".svg3").remove()}
    
var setup1=function(all)
{
var screen3 = {width:800,height:550}
var margins={top:10,right:50,bottom:50,left:50}

d3.select("body")
              .append("svg")
              .attr("class","svg3")
              .attr("width", screen3.width)
              .attr("height", screen3.height);
    
     d3.select(".svg3")
    .append("g")
    .attr("id","graph2")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width3=screen3.width-margins.left-margins.right
    var height3=screen3.height-margins.top-margins.bottom
    
    var xScale3=d3.scaleLinear()
    .domain([-0.03,0.1])
    .range([0,width3])
    
    var yScale3=d3.scaleLinear()
    .domain([-0.03,0.08])
    .range([height3,0])
    
        var cScale3=d3.scaleOrdinal
        
       var formatter = d3.format(".1%");
    
    var xAxis3=d3.axisBottom(xScale3)
    .tickFormat(formatter)
    
    var yAxis3=d3.axisLeft(yScale3)
    .tickFormat(formatter)
    
        d3.select(".svg3")
    .append("g")
    .classed("axis3",true);
    
    d3.select(".axis3")
    .append("g")
    .attr("id","xAxis3")
    .attr("transform","translate("+margins.left+",356)")
    .call(xAxis3)
    
        d3.select(".axis3")
    .append("g")
    .attr("id","yAxis3")
    .attr("transform","translate(211,0)")
    .call(yAxis3)
    
    d3.select("#graph2")
    .selectAll("circle")
    .data(all.features)
    .enter()
    .append("circle")
    .filter(function(d){return d.properties.economicdata.rgdppercapita17<7000})
       .attr("fill","red")
    .attr("r",5)
    .attr("cx",function(d)
    {
      return xScale3(d.properties.economicdata.growthofcapital);
    })
    .attr("cy",function(d)
    {
      return yScale3(d.properties.economicdata.growthofrgdp);
    })

d3.select(".svg3")
    .append("line")
    .attr("x1",50)
    .attr("y1",460)
    .attr("x2",800)
    .attr("y2",40)
    .attr("stroke-width", 3)
    .attr("stroke", "blue");
    
    d3.select("body")
    .append("p")
    .attr("class","text1")
    .text("That is the graph showing the relationship between growth in real GDP per capita and the growth in capital per capita for coutries are relativly poor (0~33% richest). The relationship between them is growth in real GDP per capita= -2.86E-03 + 0.556*grwoth in capital per capita. Which being said, they have to invest in capital to have a growth or their real GDP per capita will decrease by 0.286%, and 1% more investment in capital will lead to 0.556% increase in real GDP per capita")
 
    
    
}



var setup2=function(all)
{
var screen3 = {width:800,height:550}
var margins={top:10,right:50,bottom:50,left:50}

d3.select("body")
              .append("svg")
              .attr("class","svg3")
              .attr("width", screen3.width)
              .attr("height", screen3.height);
    
     d3.select(".svg3")
    .append("g")
    .attr("id","graph2")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width3=screen3.width-margins.left-margins.right
    var height3=screen3.height-margins.top-margins.bottom
    
    var xScale3=d3.scaleLinear()
    .domain([-0.03,0.1])
    .range([0,width3])
    
    var yScale3=d3.scaleLinear()
    .domain([-0.03,0.08])
    .range([height3,0])
    
        var cScale3=d3.scaleOrdinal
        
       var formatter = d3.format(".1%");
    
    var xAxis3=d3.axisBottom(xScale3)
    .tickFormat(formatter)
    
    var yAxis3=d3.axisLeft(yScale3)
    .tickFormat(formatter)
    
        d3.select(".svg3")
    .append("g")
    .classed("axis3",true);
    
     d3.select(".axis3")
    .append("g")
    .attr("id","xAxis3")
    .attr("transform","translate("+margins.left+",356)")
    .call(xAxis3)
    
        d3.select(".axis3")
    .append("g")
    .attr("id","yAxis3")
    .attr("transform","translate(211,0)")
    .call(yAxis3)
    
    d3.select("#graph2")
    .selectAll("circle")
    .data(all.features)
    .enter()
    .append("circle")
    .filter(function(d){return d.properties.economicdata.rgdppercapita17<21200 & d.properties.economicdata.rgdppercapita17>7000 })
       .attr("fill","red")
    .attr("r",5)
    .attr("cx",function(d)
    {
      return xScale3(d.properties.economicdata.growthofcapital);
    })
    .attr("cy",function(d)
    {
      return yScale3(d.properties.economicdata.growthofrgdp);
    })

    d3.select(".svg3")
    .append("line")
    .attr("x1",50)
    .attr("y1",400)
    .attr("x2",800)
    .attr("y2",130)
    .attr("stroke-width", 3)
    .attr("stroke", "blue");
    
    
    d3.select("body")
    .append("p")
    .attr("class","text1")
    .text("This the graph for 33%~66.7% richest countries. The relationship changes to growth in real GDP per capita= 4.54E-03 + 0.377*grwoth in capital per capita.The countries in that range do not need to invest in capital to have an economic growth because the intercept is postiive which means they can have a 0.454% growth without any growth in the capital per capita. Moreover, 1% more capital will only increase the real GDP per capital by 0.377%, which is smaller than 0.556 in the previous case")
 
}

var setup3=function(all)
{
var screen3 = {width:800,height:550}
var margins={top:10,right:50,bottom:50,left:50}

d3.select("body")
              .append("svg")
              .attr("class","svg3")
              .attr("width", screen3.width)
              .attr("height", screen3.height);
    
     d3.select(".svg3")
    .append("g")
    .attr("id","graph2")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width3=screen3.width-margins.left-margins.right
    var height3=screen3.height-margins.top-margins.bottom
    
    var xScale3=d3.scaleLinear()
    .domain([-0.03,0.1])
    .range([0,width3])
    
    var yScale3=d3.scaleLinear()
    .domain([-0.03,0.08])
    .range([height3,0])
    
        var cScale3=d3.scaleOrdinal
        
       var formatter = d3.format(".1%");
    
    var xAxis3=d3.axisBottom(xScale3)
    .tickFormat(formatter)
    
    var yAxis3=d3.axisLeft(yScale3)
    .tickFormat(formatter)
    
        d3.select(".svg3")
    .append("g")
    .classed("axis3",true);
    
    d3.select(".axis3")
    .append("g")
    .attr("id","xAxis3")
    .attr("transform","translate("+margins.left+",356)")
    .call(xAxis3)
    
        d3.select(".axis3")
    .append("g")
    .attr("id","yAxis3")
    .attr("transform","translate(211,0)")
    .call(yAxis3)
    
    d3.select("#graph2")
    .selectAll("circle")
    .data(all.features)
    .enter()
    .append("circle")
    .filter(function(d){return d.properties.economicdata.rgdppercapita17>21200})
       .attr("fill","red")
    .attr("r",5)
    .attr("cx",function(d)
    {
      return xScale3(d.properties.economicdata.growthofcapital);
    })
    .attr("cy",function(d)
    {
      return yScale3(d.properties.economicdata.growthofrgdp);
    })
    
    d3.select(".svg3")
    .append("line")
    .attr("x1",50)
    .attr("y1",330)
    .attr("x2",800)
    .attr("y2",130)
    .attr("stroke-width", 3)
    .attr("stroke", "blue");
    
    d3.select("body")
    .append("p")
    .attr("class","text1")
    .text("This the graph for top 33% most richest countries. The relationship changes to growth in real GDP per capita= 0.0158 + 0.181*grwoth in capital per capita. Countries in that range do not really rely on more investment in capital to boost the growth. Without any investment in capital, they still have a 1.58% growth, and 1% more capital will only increase the real GDP per capital by 0.181%, which is really small compared to previous cases")
}

var setup4=function()
{
     d3.select("body")
    .append("p")
    .attr("class","conclusion")
    .text("Based on the different relationships between the growth in real GDP per capita and the grwoth in capital per capita, we can see that investment in capital becomes less and less important when the countries become richer. First of all, richer countries do not even have to invest more capital to have a positive economic growth as the intercept changes from -0.286% to 0.454% to 1.58%. Secondly, the richer the country is, the less influential the investment in capital is. For the pooriest countries to the richest countries, the change in the growth in real GDP per capita caused by 1% increase in capital per capita decrease from 0.556% to 0.181%. Of course, it is always true to say that investing capital can help to grow the economy, but it is not true to say that it is important for every country, because obviously, it is not that important for richer countries, who will not have much return from investing in capital.")
}