<template>
  <div class="chord-chart">
    <svg class="chord-chart-svg" :viewBox="`0 0 ${size} ${size}`">
      <defs></defs>
      <g :transform="`translate(${margins.chart}, ${margins.chart})`"></g>
    </svg>
    <div class="tooltip-container">
      <p>{{tooltipText}}</p>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

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
      return d3.chord().padAngle(this.padAngle)(this.dataArr);
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.chart();
  },
  methods: {
    onResize() {
      this.size = this.$el.clientWidth;
    },
    svg(child) {
      return child
        ? d3
            .select(this.$el)
            .select("svg")
            .select(child)
        : d3.select(this.$el).select("svg");
    },
    genId(d) {
      return `id-${d.source.index}-${d.target.index}`;
    },
    groupsGenId(d) {
      return `id-${d.index}-${d.value}`;
    },
    ribbon() {
      return d3.ribbon().radius(this.chartSize / 2 - this.margins.chord);
    },
    arc() {
      return d3
        .arc()
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
          // return `hsl(${(360 / this.dataChord.groups.length) *
          //   d.source.index}, 50%, 50%)`;
          return this.labels[d.source.index].color;
        });

      //Set the ending color (at 100%)
      grads
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d => {
          // return `hsl(${(360 / this.dataChord.groups.length) *
          //   d.target.index}, 50%, 50%)`;
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
        .attr("opacity", 0.4)
        .on("mouseenter", (d, i, nodes) => {
          d3.select(nodes[i])
            .transition()
            .attr("opacity", 1);

          this.tooltipText = `${this.labels[d.source.index].name} - ${
            this.labels[d.target.index].name
          }`;
        })
        .on("mouseout", (d, i, nodes) => {
          d3.select(nodes[i])
            .transition()
            .attr("opacity", 0.4);

          this.tooltipText = "";
        });
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
        .attr("fill", (d, i) => this.labels[i].color);
    },
    text() {
      const text = this.svg("g")
        .selectAll("g.text")
        .data(this.dataChord.groups, this.groupsGenId);

      text.exit().remove();

      text.selectAll("text").remove();

      text
        .enter()
        .append("g")
        .attr("class", "text")
        .attr(
          "transform",
          `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
        )
        .merge(text)
        .append("text")
        .text((d, i) => this.labels[i].name)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("pointer-events", "none")
        // detail a text shadow matching the color of the respective arc
        .style("text-shadow", (d, i) => {
          const color = this.labels[i].color;
          return `1px 1px ${color}, -1px -1px ${color}, 1px -1px ${color}, -1px 1px ${color}`;
        })
        .attr("fill", "#fff")
        .attr(
          "transform",
          d =>
            `rotate(${(((d.endAngle + d.startAngle) / 2) * 180) /
              Math.PI}) translate(0, ${-this.chartSize /
              2}) rotate(-${(((d.endAngle + d.startAngle) / 2) * 180) /
              Math.PI})`
        );
    },
    chart() {
      this.grads();
      this.ribbons();
      this.arcs();
      // this.text();
    }
  }
};
</script>

<style lang="scss">
.chord-chart {
  position: relative;
  width: 100%;
  line-height: 2;
  text-align: center;
}
.tooltip-container {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: end;
}
p {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
</style>
