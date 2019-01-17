<template>
  <div class="bubble-chart">
    <svg :viewBox="`0 0 ${size} ${size}`">
      <g :transform="`translate(${size/2}, ${size/2})`"></g>
    </svg>
    <div class="bubble-tooltip-container">
      <p>{{tooltipText}}</p>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapActions } from "vuex";

import ColorLuminance from "../utils/colorLuminance.js";

export default {
  name: "BubbleChart",
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.chart();
  },
  props: {
    dataArr: { type: Array, default: () => [] }
  },
  data() {
    return {
      size: 500,
      margin: 24,
      tooltipText: ""
    };
  },
  watch: {
    size() {
      this.chart();
    },
    dataArr() {
      this.chart();
    }
  },
  computed: {
    maxCount() {
      return this.dataArr.reduce(
        (acc, { count }) => (acc > count ? acc : count),
        0
      );
    }
  },
  methods: {
    ...mapActions(["filterToggle"]),
    svg(child) {
      const svg = d3.select(this.$el).select("svg");
      return child ? svg.select(child) : svg;
    },
    onResize() {
      this.size = this.$el.clientWidth;
    },
    calcSize({ count }) {
      const relSize = count / this.maxCount;
      return relSize * this.size * 0.2;
    },
    chart() {
      const circles = this.svg("g")
        .selectAll(".bc-circle")
        .data(this.dataArr);

      circles.exit().remove();

      circles
        .enter()
        .append("circle")
        .attr("class", "bc-circle")
        .attr("r", this.calcSize)
        .style("fill", d => "blue") //TODO: Fix color
        .on("mouseover", ({ name, color }, i, nodes) => {
          this.tooltipText = name;
          d3.select(nodes[i]).style("fill", ColorLuminance(color, -0.3));
        })
        .on("mouseout", (d, i, nodes) => {
          this.tooltipText = "";
          d3.select(nodes[i]).style("fill", "blue");
        })
        .on("click", ({ name }) => {
          this.filterToggle({ type: "topics", value: name });
        });

      const simulation = d3
        .forceSimulation()
        .force("charge", d3.forceManyBody().strength(1))
        .force("center", d3.forceCenter(this.size / 20, this.size / 20))
        .force("collision", d3.forceCollide().radius(this.calcSize));
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
.bubble-tooltip-container {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  text-align: start;
}

.bubble-chart {
  position: relative;
  width: 100%;
  line-height: 2;
}

p {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.bc-circle {
  transition: all 300ms;
}

.bc-circle:hover {
  transform: scale(1.05);
  transform-origin: 0px 0px 0px;
}
</style>