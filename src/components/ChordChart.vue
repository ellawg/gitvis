<template>
  <div class="chart">
    <div id="cchart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ChordChart",
  mounted: function() {
    this.chordChart();
  },
  props: ["dataArr", "labels"],
  methods: {
    chordChart() {
      const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
        chord: 15
      };

      const width = Math.min(window.innerWidth, 700) - margin.left - margin.right;
      const height = Math.min(window.innerWidth, 700) - margin.top - margin.bottom;
      const innerRadius = Math.min(width, height) * .39;
      const outerRadius = innerRadius * 1.1;

      const chart = d3.select("#cchart");

      const svg = chart
        .append("svg")
        .attr(
          "viewBox",
          `0 0 ${width + (margin.left + margin.right)} ${height +
            (margin.top + margin.bottom)}`
        )
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const tooltip = chart.append("div").attr("id", "cc-tooltip");

      // DATA

      const chord = d3.chord().padAngle(0.05);

      const dataChord = chord(this.dataArr);

      // GRADIENT

      //Function to create the unique id for each chord gradient
      function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }

      //Create the gradients definitions for each chord
      var grads = svg.append("defs").selectAll("linearGradient")
        .data(dataChord)
        .enter().append("linearGradient")
          //Create the unique ID for this specific source-target pairing
        .attr("id", getGradID)
        .attr("gradientUnits", "userSpaceOnUse")
        //Find the location where the source chord starts
        .attr("x1", function(d,i) { return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
        .attr("y1", function(d,i) { return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
        //Find the location where the target chord starts 
        .attr("x2", function(d,i) { return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })
        .attr("y2", function(d,i) { return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })

      //Set the starting color (at 0%)
      grads.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", function(d){ return `hsl(${360 / dataChord.groups.length * d.source.index}, 50%, 50%)`; });

      //Set the ending color (at 100%)
      grads.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", function(d){ return `hsl(${360 / dataChord.groups.length * d.target.index}, 50%, 50%)`; });

      // RIBBON

      const ribbon = d3.ribbon().radius(width / 2 - margin.chord);

      const ribbons = svg
        .selectAll("g.ribbon")
        .data(dataChord)
        .enter()
        .append("g")
        .attr("class", "ribbon")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      ribbons
        .append("path")
        .attr("d", ribbon)
        // determine the fill on the basis of the source object of each node
        .style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
        // on hover increase the opacity of the ribbon
        .attr("opacity", 0.4)
        .on("mouseenter", function(d) {
          d3.select(this)
            .transition()
            .attr("opacity", 1);

          tooltip
            .append("p")
            .text(
              `${labels[d.source.index].name} - ${labels[d.target.index].name}`
            );

          tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .attr("opacity", 0.4);

          tooltip
            .style("opacity", 0)
            .selectAll("p")
            .remove();
        });

      const arc = d3
        .arc()
        .innerRadius(width / 2 - margin.chord)
        .outerRadius(width / 2);

      const arcs = svg
        .selectAll("g.arc")
        .data(dataChord.groups)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      arcs
        .append("path")
        .attr("d", arc)
        .attr(
          "fill",
          d => `hsl(${(360 / dataChord.groups.length) * d.index},50%, 50%)`
        );

      const text = svg
        .selectAll("g.text")
        .data(dataChord.groups)
        .enter()
        .append("g")
        .attr("class", "text")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      text
        .append("text")
        .text((d, i) => labels[i].name)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("pointer-events", "none")
        // detail a text shadow matching the color of the respective arc
        .style("text-shadow", d => {
          const color = `hsl(${(360 / dataChord.groups.length) *
            d.index},50%, 50%)`;
          return `2px 2px ${color}, -2px -2px ${color}, 2px -2px ${color}, -2px 2px ${color}`;
        })
        .attr("fill", "#fff")
        .attr(
          "transform",
          d =>
            `rotate(${(((d.endAngle + d.startAngle) / 2) * 180) /
              Math.PI}) translate(0, ${-height / 2}) rotate(-${(((d.endAngle +
              d.startAngle) /
              2) *
              180) /
              Math.PI})`
        );
    }
  }
};
</script>
<style lang="scss">
.chart {
  max-width: 700px;
  width: 90vw;
  margin: 1rem auto;
  padding: 1rem;
  line-height: 2;
  text-align: center;
}
#cc-tooltip {
  display: flex;
  flex-direction: row-reverse;
  pointer-events: none;
  z-index: 10;
  color: #303950;
  transition: all 0.2s ease-out;
}
p {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
</style>
