<template>
  <div class="chord-chart">
    <svg class="chord-chart-svg" :width="size" :height="size">
      <g :transform="`translate(${margins.chart}, ${margins.chart})`"></g>
    </svg>
    <div class="tooltip-container">
      <p>tooltip</p>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ChordChart",
  props: ["dataArr", "labels"],
  data() {
    return {
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
      this.createChart();
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
    this.createChart();
  },
  updated() {
    this.createChart();
  },
  methods: {
    onResize(e) {
      console.log(this.$el.clientWidth);
      this.size = this.$el.clientWidth;
    },
    svg() {
      return d3
        .select(this.$el)
        .select("svg")
        .select("g");
    },
    tooltip() {
      return d3.select(this.$el).select(".tooltip-container");
    },
    gradId(d) {
      return `linkGrad-${d.source.index}-${d.target.index}`;
    },
    createGrads(enter) {
      return enter;
    },
    ribbon() {
      return d3.ribbon().radius(this.chartWidth / 2 - this.margins.chord);
    },
    arc() {
      return d3
        .arc()
        .innerRadius(this.chartSize / 2 - this.margins.chord)
        .outerRadius(this.chartSize / 2);
    },
    createChart() {
      //Create the gradients definitions for each chord
      const tooltip = this.tooltip();
      const labels = this.labels;

      this.svg()
        .selectAll("*")
        .remove();

      let grads = this.svg()
        .append("defs")
        .selectAll("linearGradient")
        .data(this.dataChord)
        .enter()
        .append("linearGradient")
        //Create the unique ID for this specific source-target pairing
        .attr("id", this.gradId)
        .attr("gradientUnits", "userSpaceOnUse")
        //Find the location where the source chord starts
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
        .attr("stop-color", (d, i) => {
          return `hsl(${(360 / this.dataChord.groups.length) *
            d.source.index}, 50%, 50%)`;
        });

      //Set the ending color (at 100%)
      grads
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", (d, i) => {
          return `hsl(${(360 / this.dataChord.groups.length) *
            d.target.index}, 50%, 50%)`;
        });

      // RIBBON

      const ribbon = d3
        .ribbon()
        .radius(this.chartSize / 2 - this.margins.chord);

      const ribbons = this.svg()
        .selectAll("g.ribbon")
        .data(this.dataChord)
        .enter()
        .append("g")
        .attr("class", "ribbon")
        .attr(
          "transform",
          `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
        );

      ribbons
        .append("path")
        .attr("d", ribbon)
        // determine the fill on the basis of the source object of each node
        .style("fill", d => {
          return "url(#" + this.gradId(d) + ")";
        })
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

          tooltip.style("opacity", 1);
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

      const arcs = this.svg()
        .selectAll("g.arc")
        .data(this.dataChord.groups)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr(
          "transform",
          `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
        );

      arcs
        .append("path")
        .attr("d", this.arc())
        .attr(
          "fill",
          d => `hsl(${(360 / this.dataChord.groups.length) * d.index},50%, 50%)`
        );

      // const text = this.svg()
      //   .selectAll("g.text")
      //   .data(this.dataChord.groups)
      //   .enter()
      //   .append("g")
      //   .attr("class", "text")
      //   .attr(
      //     "transform",
      //     `translate(${this.chartSize / 2}, ${this.chartSize / 2})`
      //   );

      // text
      //   .append("text")
      //   .text((d, i) => this.labels[i].name)
      //   .attr("font-weight", "bold")
      //   .attr("text-anchor", "middle")
      //   .attr("alignment-baseline", "middle")
      //   .style("pointer-events", "none")
      //   // detail a text shadow matching the color of the respective arc
      //   .style("text-shadow", d => {
      //     const color = `hsl(${(360 / this.dataChord.groups.length) *
      //       d.index},50%, 50%)`;
      //     return `2px 2px ${color}, -2px -2px ${color}, 2px -2px ${color}, -2px 2px ${color}`;
      //   })
      //   .attr("fill", "#fff")
      //   .attr(
      //     "transform",
      //     d =>
      //       `rotate(${(((d.endAngle + d.startAngle) / 2) * 180) /
      //         Math.PI}) translate(0, ${-this.chartSize /
      //         2}) rotate(-${(((d.endAngle + d.startAngle) / 2) * 180) /
      //         Math.PI})`
      //   );
    }
  }
};
</script>

<style lang="scss">
.chord-chart {
  position: relative;
  width: 100%;
  margin: 1rem auto;
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
