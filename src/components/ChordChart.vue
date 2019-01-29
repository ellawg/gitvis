<template>
  <div class="chord-chart">
    <svg class="chord-chart-svg" :viewBox="`0 0 ${size} ${size}`">
      <defs></defs>
      <g :transform="`translate(${margins.chart}, ${margins.chart})`"></g>
    </svg>
    <div class="chord-tooltip-container">
      <p>{{ tooltipText }}</p>
    </div>
  </div>
</template>

<script>
import { select, chord, ribbon, arc } from "d3";
import { mapActions } from "vuex";

export default {
  name: "ChordChart",
  props: {
    dataArr: { type: Array, default: () => [] },
    labels: { type: Array, default: () => [] }
  },
  data() {
    return {
      tooltipText: "",
      size: 500,
      margins: {
        chart: 24,
        chord: 15
      },
      padAngle: 0.05,
      radius: {
        inner: 0.39,
        outer: 1.1
      }
    };
  },
  watch: {
    size() {
      this.chart();
    },
    dataArr() {
      this.chart();
    },
    labels() {
      this.chart();
    }
  },
  computed: {
    chartSize() {
      return this.size - this.margins.chart * 2;
    },
    innerRadius() {
      return this.size * this.radius.inner;
    },
    outerRadius() {
      return this.innerRadius * this.radius.outer;
    },
    // This creates the data for the chart
    dataChord() {
      return chord().padAngle(this.padAngle)(this.dataArr);
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.chart();
  },
  methods: {
    ...mapActions(["filterToggle"]),
    onResize() {
      this.size = this.$el.clientWidth;
    },
    svg(child) {
      const svg = select(this.$el).select("svg");
      return child ? svg.select(child) : svg;
    },
    genId({ source, target }) {
      return `id-${source.index}-${target.index}`;
    },
    groupsGenId({ index, value }) {
      return `id-${index}-${value}`;
    },
    ribbon() {
      return ribbon().radius(this.chartSize / 2 - this.margins.chord);
    },
    arc() {
      return arc()
        .innerRadius(this.chartSize / 2 - this.margins.chord)
        .outerRadius(this.chartSize / 2);
    },
    grads() {
      const grads = this.svg("defs")
        .selectAll("linearGradient")
        .data(this.dataChord, this.genId);

      grads.exit().remove();

      grads.selectAll("stop").remove();

      grads
        .enter()
        .append("linearGradient")
        //Create the unique ID for this specific source-target pairing

        .attr("gradientUnits", "userSpaceOnUse")
        //Find the location where the source chord starts
        .merge(grads)
        .attr("id", this.genId)
        .attr("x1", d => {
          return (
            this.innerRadius *
            Math.cos(
              (d.source.endAngle - d.source.startAngle) / 2 +
                d.source.startAngle -
                Math.PI / 2
            )
          );
        })
        .attr("y1", d => {
          return (
            this.innerRadius *
            Math.sin(
              (d.source.endAngle - d.source.startAngle) / 2 +
                d.source.startAngle -
                Math.PI / 2
            )
          );
        })
        //Find the location where the target chord starts
        .attr("x2", d => {
          return (
            this.innerRadius *
            Math.cos(
              (d.target.endAngle - d.target.startAngle) / 2 +
                d.target.startAngle -
                Math.PI / 2
            )
          );
        })
        .attr("y2", d => {
          return (
            this.innerRadius *
            Math.sin(
              (d.target.endAngle - d.target.startAngle) / 2 +
                d.target.startAngle -
                Math.PI / 2
            )
          );
        });

      //Set the starting color (at 0%)
      grads
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d => {
          return this.labels[d.source.index].color;
        });

      //Set the ending color (at 100%)
      grads
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d => {
          return this.labels[d.target.index].color;
        });
    },
    ribbons() {
      const ribbons = this.svg("g")
        .selectAll("g.ribbon")
        .data(this.dataChord, this.genId);

      ribbons.exit().remove();

      ribbons.selectAll("path").remove();

      ribbons
        .enter()
        .append("g")
        .attr("class", "ribbon")
        .merge(ribbons)
        .attr(
          "transform",
          `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
        )
        .append("path")
        .attr("d", this.ribbon())
        // determine the fill on the basis of the source object of each node
        .style("fill", d => {
          return "url(#" + this.genId(d) + ")";
        })
        // on hover increase the opacity of the ribbon
        .attr("opacity", 0.4);
    },
    arcHover(index) {
      this.svg("g")
        .selectAll("g.ribbon")
        .data(this.dataChord, this.genId)
        .selectAll("path")
        .attr("opacity", d =>
          d.source.index === index || d.target.index === index ? 1 : 0.1
        );
    },
    arcHoverOut() {
      this.svg("g")
        .selectAll("g.ribbon")
        .selectAll("path")
        .attr("opacity", 0.4);
    },
    arcs() {
      const arcs = this.svg("g")
        .selectAll("g.arc")
        .data(this.dataChord.groups, this.groupsGenId);

      arcs.exit().remove();

      arcs.selectAll("path").remove();

      arcs
        .enter()
        .append("g")
        .attr("class", "arc")
        .merge(arcs)
        .attr(
          "transform",
          `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
        )
        .append("path")
        .attr("d", this.arc())
        .attr("fill", (d, i) => this.labels[i].color)
        .on("mouseenter", (d, i) => {
          this.arcHover(i);
          this.tooltipText = this.labels[i].name;
        })
        .on("mouseout", () => {
          this.arcHoverOut();
          this.tooltipText = "";
        })
        .on("click", (d, i) => {
          this.filterToggle({ type: "languages", value: this.labels[i].name });
        });
    },
    chart() {
      this.grads();
      this.ribbons();
      this.arcs();
    }
  }
};
</script>

<style lang="scss" scoped>
.chord-chart {
  position: relative;
  width: 100%;
}
.chord-tooltip-container {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -10;
  text-align: end;
}
p {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
</style>
