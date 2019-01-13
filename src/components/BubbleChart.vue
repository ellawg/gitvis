<template>
  <div id="bchart"></div>
</template>

<script>
import * as d3 from "d3";
import ColorLuminance from "../utils/colorLuminance.js";

export default {
  name: "BubbleChart",
  mounted: function() {
    this.bubbleChart();
  },
  props: ["dataArr"],
  methods: {
    bubbleChart() {
      let width = 500;
      let height = 500;

      const chart = d3.select("#bchart");

      const svg = chart
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + [width / 2, height / 2] + ")");

      const tooltip = chart.append("div").attr("id", "bc-tooltip");

      const circles = svg
        .selectAll(".bc-circle")
        .data(this.dataArr)
        .enter()
        .append("circle")
        .attr("class", "bc-circle")
        .attr("r", d => d.count)
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
        .force("charge", d3.forceManyBody().strength([10]))
        .force("center", d3.forceCenter(width/20, height/20))
        .force('collision', d3.forceCollide().radius(function(d) {
    return d.count}))
        //.force("x", d3.forceX().strength(0.15))
        //.force("y", d3.forceY().strength(0.15));

      simulation.nodes(this.dataArr).on("tick", ticked);

      function ticked() {
        circles.attr("cx", d => d.x).attr("cy", d => d.y);
      }
    }
  }
};
</script>

<style lang="scss">
#bc-tooltip {
  display: flex;
  z-index: 10;
  visibility: hidden;
  color: #303950;
  transition: all 0.2s ease-out;
}

.bc-circle {
  transition: all 300ms;
}

.bc-circle:hover {
  transform: scale(1.05);
  transform-origin: 0px 0px 0px;
}
</style>