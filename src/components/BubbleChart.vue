<template>
  <div class="bubble-chart">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <g :transform="`translate(${size / 2}, ${size / 2})`"></g>
    </svg>
    <div class="bubble-tooltip-container">
      <p>{{ tooltipText }}</p>
    </div>
  </div>
</template>

<script>
import {
  select,
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceManyBody,
  scaleLog,
  scaleSequential,
  interpolateInferno
} from "d3";
import { mapActions } from "vuex";

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
      size: 0,
      margin: 24,
      tooltipText: "",
      forceStrength: 0.05
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
    },
    minCount() {
      return this.dataArr.reduce(
        (acc, { count }) => (acc < count ? acc : count),
        this.maxCount
      );
    },
    maxStars() {
      return this.dataArr.reduce(
        (acc, { stars }) => (acc > stars ? acc : stars),
        0
      );
    },
    minStars() {
      return this.dataArr.reduce(
        (acc, { stars }) => (acc < stars ? acc : stars),
        this.maxStars
      );
    },
    maxRadius() {
      return this.size / 10;
    }
  },
  methods: {
    ...mapActions(["filterToggle"]),
    svg(child) {
      const svg = select(this.$el).select("svg");
      return child ? svg.select(child) : svg;
    },
    onResize() {
      this.size = this.$el.clientWidth;
    },
    calcSize({ count }) {
      const scale = scaleLog()
        .domain([this.minCount, this.maxCount])
        .range([5, this.maxRadius]);
      return scale(count);
    },
    colorScale({ stars }) {
      const scale = scaleSequential()
        .domain([this.minStars, this.maxStars])
        .interpolator(interpolateInferno);
      return scale(stars);
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
        .style("fill", this.colorScale)
        .on("mouseover", ({ name }, i, nodes) => {
          this.tooltipText = name;
          select(nodes[i]).style("fill", "orange");
        })
        .on("mouseout", (d, i, nodes) => {
          this.tooltipText = "";
          select(nodes[i]).style("fill", this.colorScale);
        })
        .on("click", ({ name }) => {
          this.filterToggle({ type: "topics", value: name });
        });

      const simulation = forceSimulation()
        .force("x", forceX().strength(this.forceStrength))
        .force("y", forceY().strength(this.forceStrength))
        // .force("center", d3.forceCenter([0, 0]).strength(this.forceStrength))
        .force("collision", forceCollide().radius(this.calcSize))
        .force("charge", forceManyBody().strength(5));

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
</style>
