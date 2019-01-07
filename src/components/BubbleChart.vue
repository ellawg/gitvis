<template>
    <div class="bubble-chart" id="bchart"><svg></svg>
      <div id="tooltip"></div>
    </div>
</template>

<script>
import * as d3 from "d3";
import ColorLuminance from "../utils/colorluminance.js";

const dataArr = [
  {
    id: "MDg6TGFuZ3VhZ2UxNDA=",
    name: "JavaScript",
    size: 0.6,
    color: "#2E294E"
  },
  { id: "MDg6TGFuZ3VhZ2UxNDU=", name: "Python", size: 0.2, color: "#D7263D" },
  { id: "MDg6TGFuZ3VhZ2UzMDg=", name: "CSS", size: 0.1, color: "#F46036" },
  {
    id: "MDg6TGFuZ3VhZ2UzMDt=",
    name: "TypeScript",
    size: 0.2,
    color: "#1B998B"
  }
];


function bubbleChart() {
  let width = 500;
  let height = 500;

  const svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + [width / 2, height / 2] + ")");

  const tooltip = d3.select("#tooltip");

  const circles = svg
    .selectAll(".bc-circle")
    .data(dataArr)
    .enter()
    .append("circle")
    .attr("class", "bc-circle")
    .attr("r", d => 50 * d.size)
    .style("fill", d => d.color)
    .on("mouseover", function(d) {
      d3.select(this).style("fill", ColorLuminance(d.color, -0.3));
      tooltip.style("visibility", "visible").text(d.name);
    })
    .on("mouseout", function(d) {
      tooltip.style("visibility", "hidden").text("");
      d3.select(this).style("fill", d.color);
    });

  const simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength([-80]))
    .force("x", d3.forceX().strength(0.05))
    .force("y", d3.forceY().strength(0.05));

  simulation.nodes(dataArr).on("tick", ticked);

  function ticked() {
    circles.attr("cx", d => d.x).attr("cy", d => d.y);
  }
}

export default {
  name: "BubbleChart",
  mounted: function() {
    // runs when this component is mounted on the page
    bubbleChart();
  }
};
</script>

<style lang="scss">
#tooltip {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  visibility: hidden;
}

.bc-circle {
  transition: all 300ms;
}

.bc-circle:hover {
  transform: scale(1.05);
  transform-origin: 0px 0px 0px;
}
</style>