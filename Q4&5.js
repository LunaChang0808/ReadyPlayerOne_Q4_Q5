import define1 from "./2.js";
import define2 from "./4.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([
    ["Sheet 1@1.jpg",new URL("./files/Sheet",import.meta.url)],
    ["games_output_groups-2.csv",new URL("./files/games_output_groups",import.meta.url)],
    ["games_output_groups.csv",new URL("./files/games_output",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# ReadyPlayerOne -- Question 4 & 5`
)});

  main.variable(observer()).define(["md"], function(md){return(
md`## Q4: Which well-known intellectual property(IP) gives the games more intrinsic value?
`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<iframe sandbox="allow-scripts allow-pointer-lock allow-same-origin
allow-popups allow-modals allow-forms" frameBorder="0" class="anychart-embed anychart-embed-lugALX51"
allowtransparency="true" allowfullscreen="true"
src="https://playground.anychart.com/lugALX51/iframe">
</iframe>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
To figure out the question, we built a categorized weighted word cloud of top 40 IPs(sorted by total IOS income). The color of the words represents the type of the IP, and the size is proportional to the income.
Most top IPs are video or PC game. Among them, the topest IP is Fantasy westward journey, which is a PC online game published by Netease in 2003. One interesting thing is that the comic IPs are mostly originated from Japan, which reflects the cultural soft power of comic industry.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Q5: What are the underlying characteristics for mobile game classification? Which game ranks first and why?
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
In order to answer this question, we will dicsuss the following aspects:
- The features of different games to see their pattern.
- Individual game income and download for discovering the most profitable games.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## (a) The diagrams for Features of Different Games to See Their Pattern.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 🔥 Mobile Games Clustering
`
)});
  main.variable(observer("viewof x")).define("viewof x", ["Select"], function(Select){return(
Select("1", {label: "PCA1", value: "Displacement"})
)});
  main.variable(observer("x")).define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer("viewof y")).define("viewof y", ["Select"], function(Select){return(
Select("2", {label: "PCA2", value: "Acceleration"})
)});
  main.variable(observer("y")).define("y", ["Generators", "viewof y"], (G, _) => G.input(_));
  main.variable(observer("viewof clusters")).define("viewof clusters", ["Range"], function(Range){return(
Range([2,10], {step: 1, value: 3, label: "Clusters"})
)});
  main.variable(observer("clusters")).define("clusters", ["Generators", "viewof clusters"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["kmeans","data","clusters","d3","width","height","myWidth","xScale","yScale","xAxis","margin","x","yAxis","y","color"], function(kmeans,data,clusters,d3,width,height,myWidth,xScale,yScale,xAxis,margin,x,yAxis,y,color)
{
  kmeans(data, clusters) 
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("max-width", myWidth); 

  xScale.domain(d3.extent(data, d => d.x)).nice()
  yScale.domain(d3.extent(data, d => d.y)).nice()
  
  svg.append("g")
      .call(xAxis)
      .append("text")
        .attr("x", myWidth)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(x)

  svg.append("g")
      .call(yAxis)
      .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(y)

  svg.append("g")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("stroke", d => color(d.cluster))
      .attr("r", 3);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### 🔥 PCA and K-means: Mobile Games`
)});
  main.variable(observer("pca")).define("pca", ["d3","DOM","w","margin_1","h","games_output_groups","xScale_1","yScale_1","colorScale","xAxis_1","yAxis_1"], function(d3,DOM,w,margin_1,h,games_output_groups,xScale_1,yScale_1,colorScale,xAxis_1,yAxis_1)
{
  const svg = d3.select(DOM.svg(w + margin_1.left + margin_1.right , h + margin_1.top + margin_1.bottom ))
  
  svg.append('g')
     .attr('transform','translate(' + margin_1.left + ',' + margin_1.top + ')')
     .selectAll('circle')
     .data(games_output_groups)
     .enter()
     .append('circle')
     .attr('cx',function (d) { return xScale_1(d.x) })
     .attr('cy',function (d) { return yScale_1(d.y) })
     .attr('r','10')
     .attr('opacity', 0.5)
     .attr('stroke-width',1)
     .attr('fill', function (d,i) { return colorScale(d.c) })
     .on('mouseover', function () {
                d3.select(this)
                .transition()
                .duration(300)
                .attr('r',20)
                .attr('stroke-width',3)
                })
     .on('mouseout', function () {
                d3.select(this)
                .transition()
                .duration(300)
                .attr('r',10)
                .attr('stroke-width',1)
                })
               .append('title') // Tooltip
               .text(function (d) { return d.name})
 
 svg.append("g")
      .call(xAxis_1);
 
 svg.append("text")             
      .attr("transform",
            "translate(" + (w + margin_1.right/2) + " ," + 
                          20  + ")")
      .style("text-anchor", "beginning")
      .text("PC1");
  
  svg.append("g")
      .call(yAxis_1);
  
 svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - h - margin_1.bottom)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("PC2");      

  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
We aggregated our data in the aspects of mobile game dimension and applied PCA (components=5) and K-Means (K=4) to visualize their structure and pattern (cluster 0 :red; cluster 1:orange; cluster2: green; cluster3: blue).

Revenue are not limited to a certain game type, it may be that games with certain characteristics will produce relatively high economic benefits. In order to explore this point, we explore the potential characteristics of popular games.

From this plot, we could see interesting clusters. If we have a look at the original features, we could see that the most lucrative game - Honor of Kings does not blong to the most lucrative clusters. In fact, cluster 2 has a gap concerning their income. But they are all basically the top mobile games in their region and their income rely on the home country too much even though they have been published in other regions. 

The most lucrative game concerning average iOS income is the cluster 0. They have more mobile games based on IP and is able to gain considerable revenue in most regions although they don not perform as leading as the cluster 2. This might be due to their flexibility in global context and strong capacity of publishment overseas.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## (b) Most profitable games world-wide 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 🔥 Stack Plot for Top 20 Mobile Games Based on IOS Income Across Time`
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("Sheet 1@1.jpg").image()
)});
  main.variable(observer()).define(["md"], function(md){return(
md` This section aims to discover which game ranks first and why. The above stack plot is created based on the top 20 IOS income individual mobile games, along with their numbers of IOS downloads. Each game is represented by a unique color. The x-axis implies the time from Jan 2018 to Dec 2019, while verticle axix shows the total IOS income and IOS download, respectively. Besides, the width of each color (each mobile game) suggest their individual IOS income across time.

Based on the graph, we can see the overall trend of individual mobile games clearly, and several conclusions can be made. 

- Game 'Honour of Kings' gains the most income all the time based on its width of vertical axis on the IOS income section. Besides,from the stack plot concerning IOS downloads, game 'Honour of Kings' maintained steady downloads over time, which gurantees their users engagement and future sustainability. Therefore, it is of no suprise that 'Honour of King' is the number one game of all the time (2018-2019).

- Another fact worth mentioning is that 'Game for Peace' soared to popularity in May 2019. As we observed from the graph, it published much later (mid 2019) than any other top games, which means most games had more than 18 months to earn profits. Yet, its soaring earnings propelled it into the top 20. Therefore, its underlying power merits attention.

Back to our second question, why the mobile game 'Honour of Kings' ranked first. Except the fact of high user engagement and future sustainability concluded from the above chart, we have explored other valuable information outside this chart. Based on the previous heat map we created, game 'Honour of Kings' took over 98.8% of the total income in its 'MOBA' game type, thus forms absoulute monopoly. We believe this monopoly consitutes one of the most crucial components for its domination among mobile games. This can also be proved by the situation of another 'best seller' game 'Game for peace', which took nearly 40% of income in 'Battle royale game'.

To sum up, while 'Honour of King' ranked as first due to its customer sickness and constant high income of all time, alone with its monopoly in MOBA game type, other promising games such as 'Game for peace' is also worthy to pay attention.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data`
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("games_output_groups-2.csv").text(), d3.autoType)
)});
  main.variable(observer("games_output_groups")).define("games_output_groups", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("games_output_groups.csv").text(), d3.autoType)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Functions`
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3"], function(d3){return(
d3.scaleOrdinal(d3.schemeCategory10)
)});
  main.variable(observer("xScale")).define("xScale", ["d3","margin","myWidth"], function(d3,margin,myWidth){return(
d3.scaleLinear()
    .range([margin.left, myWidth - margin.right])
)});
  main.variable(observer("yScale")).define("yScale", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","xScale","width"], function(height,margin,d3,xScale,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(width / 80))
)});
  main.variable(observer("xAxis_1")).define("xAxis_1", ["d3","xScale_1"], function(d3,xScale_1){return(
d3.axisBottom().scale(xScale_1).ticks(5)
)});
  main.variable(observer("xScale_1")).define("xScale_1", ["d3","games_output_groups","w"], function(d3,games_output_groups,w){return(
d3.scaleLinear()
    .domain(d3.extent(games_output_groups, function (d) {return d.x;})).nice()
    .range([0,w])
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","yScale"], function(margin,d3,yScale){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))
)});
  main.variable(observer("yAxis_1")).define("yAxis_1", ["d3","yScale_1"], function(d3,yScale_1){return(
d3.axisRight().scale(yScale_1).tickValues([-0.4,-0.2,0,0.2])
)});
  main.variable(observer("yScale_1")).define("yScale_1", ["d3","h"], function(d3,h){return(
d3.scaleLinear()
     .domain([-0.5, 0.4]).nice()
    .range([h,0])
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleOrdinal(d3.schemeTableau10)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Parameters`
)});
  main.variable(observer("h")).define("h", ["margin_1"], function(margin_1){return(
1100 - margin_1.top - margin_1.bottom
)});
  main.variable(observer("w")).define("w", ["margin_1"], function(margin_1){return(
600 - margin_1.left - margin_1.right
)});
  main.variable(observer("myWidth")).define("myWidth", ["height","width"], function(height,width){return(
Math.min(height, width)
)});
  main.variable(observer("height")).define("height", function(){return(
450
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Appendix`
)});
  main.variable(observer("body")).define("body", ["d3"], function(d3){return(
d3.select('body')
)});
  main.variable(observer("margin_1")).define("margin_1", function(){return(
{ top: 50, right: 50, bottom: 300, left: 50 }
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 25, right: 20, bottom: 35, left: 40}
)});
  const child1 = runtime.module(define1);
  main.import("kmeans", child1);
  const child2 = runtime.module(define2);
  main.import("Range", child2);
  main.import("Select", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
