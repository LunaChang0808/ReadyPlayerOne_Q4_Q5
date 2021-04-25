import define1 from "./1.js";
import define2 from "./3.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# K-means clustering algorithm

Datapoints are simulated from several distinct groups, whose spatial placement is more or less distinct, depending on simulation parameters. Then a barebones implementation of [K-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) is used to identify clusters of points. 

`
)});
  main.variable(observer()).define(["vegalite","sample","width"], function(vegalite,sample,width){return(
vegalite({
  data: {values: sample},
  mark: "point",
  width,
  height: 360,
  autosize: "fit",
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color : {field: "group", type : "nominal"},
    shape: {field: "cluster", type: "nominal"},
    size : {"value": 100}
  },
  config: {"mark" : { "fillOpacity" : 0.5}}
})
)});
  main.variable(observer("viewof noise")).define("viewof noise", ["slider"], function(slider){return(
slider({value: "noise", description: "Level of noise.",min: 0.0,
  max: 2.0,
  precision: 2})
)});
  main.variable(observer("noise")).define("noise", ["Generators", "viewof noise"], (G, _) => G.input(_));
  main.variable(observer("viewof separation")).define("viewof separation", ["slider"], function(slider){return(
slider({value: "separation", description: "Degree of separation.",
  min: 0.5,
  max: 5.5,
  precision: 1})
)});
  main.variable(observer("separation")).define("separation", ["Generators", "viewof separation"], (G, _) => G.input(_));
  main.variable(observer("viewof N")).define("viewof N", ["slider"], function(slider){return(
slider({value: "N", description: "Number of points.",
  min: 50,
  max: 500,
  step: 1, 
  precision: 1})
)});
  main.variable(observer("N")).define("N", ["Generators", "viewof N"], (G, _) => G.input(_));
  main.variable(observer("viewof groups")).define("viewof groups", ["slider"], function(slider){return(
slider({value: "groups", description: "Number of groups.",
  min: 2,
  max: 5,
  value : 2,
  step: 1, 
  precision: 1})
)});
  main.variable(observer("groups")).define("groups", ["Generators", "viewof groups"], (G, _) => G.input(_));
  main.variable(observer("viewof clusters")).define("viewof clusters", ["slider"], function(slider){return(
slider({value: "clusters", description: "Number of clusters.",
  min: 2,
  max: 5,
  value : 2,
  step: 1, 
  precision: 1})
)});
  main.variable(observer("clusters")).define("clusters", ["Generators", "viewof clusters"], (G, _) => G.input(_));
  main.variable(observer("viewof b1")).define("viewof b1", ["button"], function(button){return(
button({value: "Generate", description: "Generate a new set of observations."})
)});
  main.variable(observer("b1")).define("b1", ["Generators", "viewof b1"], (G, _) => G.input(_));
  main.variable(observer()).define(["table","_","sample"], function(table,_,sample){return(
table(_.map (_.countBy (sample, (d) => "" +  d.group + "|" + d.cluster), (value, key) => 
{
  var bits = key.split ("|");
  return {'group' : bits[0], 'cluster' : bits[1], 'count' : value};
}))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Dependencies`
)});
  main.variable(observer("sample")).define("sample", ["b1","generate_clouds","N","noise","separation","groups","generate_2D_data","kmeans","clusters"], function(b1,generate_clouds,N,noise,separation,groups,generate_2D_data,kmeans,clusters)
{
  b1;
  var clds = generate_clouds (N, noise, separation, groups, generate_2D_data);
  kmeans (clds, clusters);
  //(x) => [x.x,x.y,x.x*x.x,x.y*x.y,x.x*x.y]);
  return clds;
}
);
  main.variable(observer("generate_2D_data")).define("generate_2D_data", ["_","random_n"], function(_,random_n){return(
(N, x, y, noise) => {
  return _.map (_.range (N), (d) => {
    return [x + random_n (0, noise), y + random_n (0, noise)]
  });
}
)});
  main.variable(observer("generate_2D_data_r")).define("generate_2D_data_r", ["_","random_n"], function(_,random_n){return(
(N, x, y, noise) => {
  return _.map (_.range (N), (d) => {
    var r = x + random_n (0, noise);
    var angle = _.random (2*Math.PI);
    return [r*Math.cos (angle), r*Math.sin(angle)]
  });
}
)});
  main.variable(observer("generate_clouds")).define("generate_clouds", ["generate_2D_data","_"], function(generate_2D_data,_){return(
(N, noise, separation, groups, generator) => {
  groups = groups || 2;
  generator = generator || generate_2D_data;
  
  var data = _.map (_.range (groups), (g) => {
      return _.map (generator (N, 1 + separation * g, 0, noise), (d) => {return {"x":d[0],"y": d[1], "group" : g}})
    })
  ;
    
  return _.flattenDepth (data); 
  
}
)});
  main.variable(observer("random_z")).define("random_z", function(){return(
()=>Math.sqrt (-2* Math.log(Math.random ()))*Math.cos (2 * Math.PI * Math.random ())
)});
  main.variable(observer("random_n")).define("random_n", ["random_z"], function(random_z){return(
(mu,sigma) => mu + Math.sqrt (sigma) * random_z()
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require("lodash")
)});
  main.variable(observer("kmeans")).define("kmeans", ["_"], function(_){return(
(d, K, transformation) => {
  transformation = transformation || ((x) => [x.x,x.y]);
  var allocation = _.map (d, (e) => _.random (K));
  var centroids  = _.map (_.range (K), (d) => []);
  
  var done = false;
  var it = 0;
  while (!done && it < 10000) {
    // compute centroids 
    for (var cluster = 0; cluster < K; cluster++) {
        var total = 0;
        // save previous value of the centroid in case the cluster is empty
        var prev = centroids[cluster];
        centroids[cluster] = _.map (_.reduce (_.filter (d, (d,i) => allocation[i] == cluster), (mean, element) => {
            total ++;
             if (total == 1) {
                mean = transformation (element);
            } else {
                var e = transformation (element);
                mean = _.map (mean, (c,k) => c + e[k]);
            }
            return mean;
        }), (ct) => ct/total);
      
        if ( centroids[cluster].length == 0) {
          centroids[cluster] = prev;
        }
    }
        done = true;
        _.each (d, (point,i) => 
                {
                    const pt          = transformation (point);
                    var best_d        = 1e100,
                        best_cluster  = allocation[i];

                    for (var cluster = 0; cluster < K; cluster++) {
                        //console.log (centroids[cluster], pt);
                        var d = Math.sqrt(_.reduce (centroids[cluster], (d,cp,idx) => {
                          return d + (cp - pt[idx])*(cp - pt[idx]);
                        }, 0));
                      
                        if (d < best_d) {
                          best_cluster = cluster;
                          best_d = d;
                        }
                    }

                    if (best_cluster !=  allocation[i]) {
                      allocation[i] = best_cluster;
                      done = false;
                    }
                }
             );
    it++;
  }
  _.each (d, (point, i) => {point.cluster = allocation[i]});
}
)});
  main.variable(observer("vegalite")).define("vegalite", ["require"], function(require){return(
require("@observablehq/vega-lite@0.1")
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("button", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  return main;
}
