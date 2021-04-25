export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["us-state-capitals.tsv",new URL("./files/us-state-capitals",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("viewof gain")).define("viewof gain", ["Range"], function(Range){return(
Range([0, 11], {value: 5, label: "Gain"})
)});
  main.variable(observer("gain")).define("gain", ["Generators", "viewof gain"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Now you can reference the input’s value (here *gain*) in any cell, and the cell will run whenever the input changes. No event listeners required!`
)});
  main.variable(observer()).define(["gain"], function(gain){return(
gain
)});
  main.variable(observer()).define(["html","gain"], function(html,gain){return(
html`The current gain is ${gain.toLocaleString("en")}!`
)});
  main.variable(observer("viewof clicks")).define("viewof clicks", ["Button"], function(Button){return(
Button("Click me")
)});
  main.variable(observer("clicks")).define("clicks", ["Generators", "viewof clicks"], (G, _) => G.input(_));
  main.variable(observer()).define(["clicks"], function(clicks){return(
clicks
)});
  main.variable(observer("viewof mute")).define("viewof mute", ["Toggle"], function(Toggle){return(
Toggle({label: "Mute"})
)});
  main.variable(observer("mute")).define("mute", ["Generators", "viewof mute"], (G, _) => G.input(_));
  main.variable(observer()).define(["mute"], function(mute){return(
mute
)});

  main.variable(observer("viewof colors")).define("viewof colors", ["Checkbox"], function(Checkbox){return(
Checkbox(["red", "green", "blue"], {label: "Colors"})
)});
  main.variable(observer("colors")).define("colors", ["Generators", "viewof colors"], (G, _) => G.input(_));
  main.variable(observer()).define(["colors"], function(colors){return(
colors
)});
  main.variable(observer("viewof color")).define("viewof color", ["Radio"], function(Radio){return(
Radio(["red", "green", "blue"], {label: "Color"})
)});
  main.variable(observer("color")).define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  main.variable(observer()).define(["color"], function(color){return(
color
)});

  main.variable(observer("viewof n")).define("viewof n", ["Range"], function(Range){return(
Range([0, 255], {step: 1, label: "Favorite number"})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["n"], function(n){return(
n
)});
  main.variable(observer("viewof homeState")).define("viewof homeState", ["Select","stateNames"], function(Select,stateNames){return(
Select([null].concat(stateNames), {label: "Home state"})
)});
  main.variable(observer("homeState")).define("homeState", ["Generators", "viewof homeState"], (G, _) => G.input(_));
  main.variable(observer()).define(["homeState"], function(homeState){return(
homeState
)});
  main.variable(observer("viewof visitedStates")).define("viewof visitedStates", ["Select","stateNames"], function(Select,stateNames){return(
Select(stateNames, {label: "Visited states", multiple: true})
)});
  main.variable(observer("visitedStates")).define("visitedStates", ["Generators", "viewof visitedStates"], (G, _) => G.input(_));
  main.variable(observer()).define(["visitedStates"], function(visitedStates){return(
visitedStates
)});

  main.variable(observer("viewof name")).define("viewof name", ["Text"], function(Text){return(
Text({label: "Name", placeholder: "What’s your name?"})
)});
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer()).define(["name"], function(name){return(
name
)});
  main.variable(observer("viewof bio")).define("viewof bio", ["Textarea"], function(Textarea){return(
Textarea({label: "Biography", placeholder: "What’s your story?"})
)});
  main.variable(observer("bio")).define("bio", ["Generators", "viewof bio"], (G, _) => G.input(_));
  main.variable(observer()).define(["bio"], function(bio){return(
bio
)});

  main.variable(observer("viewof search")).define("viewof search", ["Search","capitals"], function(Search,capitals){return(
Search(capitals, {placeholder: "Search U.S. capitals"})
)});
  main.variable(observer("search")).define("search", ["Generators", "viewof search"], (G, _) => G.input(_));
  main.variable(observer()).define(["search"], function(search){return(
search
)});

  main.variable(observer("viewof rows")).define("viewof rows", ["Table","search"], function(Table,search){return(
Table(search)
)});
  main.variable(observer("rows")).define("rows", ["Generators", "viewof rows"], (G, _) => G.input(_));
  main.variable(observer()).define(["rows"], function(rows){return(
rows
)});

  main.variable(observer()).define(["md"], function(md){return(
md`We are grateful to Jeremy Ashkenas for blazing the trail with [“The Grand Native Inputs Bazaar”](/@jashkenas/inputs). `
)});
  main.variable(observer()).define(["md","Table","html"], function(md,Table,html){return(
md`For even more, consider these “friends & family” inputs and techniques shared:

${Table([
  [["2D Slider", "/d/98bbb19bf9e859ee"], "Fabian Iwand", "a two-dimensional range"],
  [["Binary Input", "/@rreusser/binary-input"], "Ricky Reusser", "bitwise IEEE floating point"],
  [["DIY inputs", "/@bartok32/diy-inputs"], "Bartosz Prusinowski", "inputs with fun, custom styles"],
  [["FineRange", "/@rreusser/fine-range"], "Ricky Reusser", "high-precision numeric control"],
  [["Form Input", "/@mbostock/form-input"], "Mike Bostock", "multiple inputs in single cell"],
  [["Inputs", "/@jashkenas/inputs"], "Jeremy Ashkenas", "the original"],
  [["Player", "/@oscar6echo/player"], "oscar6echo", "detailed timing control for animation"],
  [["Scrubber", "/@mbostock/scrubber"], "Mike Bostock", "play/pause/scrub control for animation"],
  [["Range Slider", "/@mootari/range-slider"], "Fabian Iwand", "a two-ended range"],
  [["Ternary Slider", "/@yurivish/ternary-slider"], "Yuri Vishnevsky", "a proportion of three values"],
  [["Data driven range sliders", "/@bumbeishvili/data-driven-range-sliders"], "David B.", "a range input with a histogram"],
  [["Snapping Histogram Slider", "/@trebor/snapping-histogram-slider"], "Robert Harris", "a range input with a histogram"],
  [["Inputs in grid", "/@bumbeishvili/input-groups"], "David B.", "combine multiple inputs into a compact grid"],
  [["List Input", "/@harrislapiroff/list-input"], "Harris L.", "enter more than one of something"],
  [["Copier", "/@mbostock/copier"], "Mike Bostock", "a button to copy to the clipboard"],
  [["Tangle", "/@mbostock/tangle"], "Mike Bostock", "Bret Victor-inspired inline scrubbable numbers"],
  [["Editor", "/@cmudig/editor"], "CMU Data Interaction Group", "code editor with syntax highlighting"]
].map(([Name, Author, Description]) => ({Name, Author, Description})), {
  sort: "Name",
  rows: Infinity,
  layout: "auto",
  width: {
    "Description": "60%"
  },
  format: {
    Name: ([title, link]) => html`<a href=${link} target=_blank>${title}`
  }
})}

To share your reusable input or technique, please leave a comment.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("Inputs")).define("Inputs", ["require"], function(require){return(
require("@observablehq/inputs@0.7.21/dist/inputs.umd.min.js")
)});
  main.variable(observer("svg")).define("svg", ["htl"], function(htl){return(
htl.svg
)});
  main.variable(observer("html")).define("html", ["htl"], function(htl){return(
htl.html
)});
  main.variable(observer("htl")).define("htl", ["require"], function(require){return(
require("htl@0.2.5/dist/htl.min.js")
)});
  main.variable(observer("capitals")).define("capitals", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("us-state-capitals.tsv").tsv({typed: true})
)});
  main.variable(observer("stateNames")).define("stateNames", ["capitals"], function(capitals){return(
capitals.map(d => d.State)
)});
  main.variable(observer("Button")).define("Button", ["Inputs"], function(Inputs){return(
Inputs.Button
)});
  main.variable(observer("Toggle")).define("Toggle", ["Inputs"], function(Inputs){return(
Inputs.Toggle
)});
  main.variable(observer("Radio")).define("Radio", ["Inputs"], function(Inputs){return(
Inputs.Radio
)});
  main.variable(observer("Checkbox")).define("Checkbox", ["Inputs"], function(Inputs){return(
Inputs.Checkbox
)});
  main.variable(observer("Range")).define("Range", ["Inputs"], function(Inputs){return(
Inputs.Range
)});
  main.variable(observer("Select")).define("Select", ["Inputs"], function(Inputs){return(
Inputs.Select
)});
  main.variable(observer("Text")).define("Text", ["Inputs"], function(Inputs){return(
Inputs.Text
)});
  main.variable(observer("Textarea")).define("Textarea", ["Inputs"], function(Inputs){return(
Inputs.Textarea
)});
  main.variable(observer("Search")).define("Search", ["Inputs"], function(Inputs){return(
Inputs.Search
)});
  main.variable(observer("Table")).define("Table", ["Inputs"], function(Inputs){return(
Inputs.Table
)});
  main.variable(observer("Input")).define("Input", ["Inputs"], function(Inputs){return(
Inputs.Input
)});
  main.variable(observer("bind")).define("bind", ["Inputs"], function(Inputs){return(
Inputs.bind
)});
  main.variable(observer("disposal")).define("disposal", ["Inputs"], function(Inputs){return(
Inputs.disposal
)});
  return main;
}
