<template>
  <div class="chart">
    <div id="cchart">
      <div id="tooltip">
        <svg></svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
const countries = ['CSS', 'JavaScript', 'HTML', 'TypeScript', 'Python', 'Vue'];

const dataArr = [
    [0, 58529869.07, 54350358.47, 18332264.84, 4951048.29, 39845172.77],
    [32630803.37, 0, 69557447.88, 49313852.76, 4560724.77, 62596366.26],
    [26082184.40, 62288898.21, 0, 27815369.39, 1948689.22, 12700400.84],
    [13128552, 51157106.35, 42750171.33, 0, 465760.95, 9280851.06],
    [2356788.67, 3246391.63, 2156705.52, 542335.23, 0, 698494.45],
    [29979211.06, 81768936.37, 26701381.80, 14101623.12, 826491.23, 0]
]

function ChordChart(){

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
  chord: 15
};

const width = 500 - (margin.left + margin.right);
const height = 500 - (margin.top + margin.bottom);

const chart = d3
  .select('#cchart');

const tooltip = d3
  .select('#tooltip');

const svg = chart
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// DATA

const chord = d3
  .chord()
  .padAngle(0.05);

const dataChord = chord(dataArr);

// RIBBON

const ribbon = d3
  .ribbon()
  .radius(width / 2 - margin.chord);

const ribbons = svg
  .selectAll('g.ribbon')
  .data(dataChord)
  .enter()
  .append('g')
  .attr('class', 'ribbon')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

ribbons
  .append('path')
  .attr('d', ribbon)
  // determine the fill on the basis of the source object of each node
  .attr('fill', d => `hsl(${360 / dataChord.groups.length * d.source.index}, 50%, 50%)`)
  // on hover increase the opacity of the ribbon
  .attr('opacity', 0.4)
  .on('mouseenter', function (d) {
    d3
      .select(this)
      .transition()
      .attr('opacity', 1);
  

    tooltip
      .append('p')
      .text(`${countries[d.source.index]} - ${countries[d.target.index]}`);


    tooltip
      .style('opacity', 1)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  })
  .on('mouseout', function () {
    d3
      .select(this)
      .transition()
      .attr('opacity', 0.4);

    tooltip
      .style('opacity', 0)
      .selectAll('p')
      .remove();
  });

const arc = d3
  .arc()
  .innerRadius(width / 2 - margin.chord)
  .outerRadius(width / 2);

const arcs = svg
  .selectAll('g.arc')
  .data(dataChord.groups)
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

arcs
  .append('path')
  .attr('d', arc)
  .attr('fill', d => `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`);

const text = svg
  .selectAll('g.text')
  .data(dataChord.groups)
  .enter()
  .append('g')
  .attr('class', 'text')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);


text
  .append('text')
  .text((d, i) => countries[i])
  .attr('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('pointer-events', 'none')
  // detail a text shadow matching the color of the respective arc
  .style('text-shadow', (d) => {
    const color = `hsl(${360 / dataChord.groups.length * d.index},50%, 50%)`;
    return `2px 2px ${color}, -2px -2px ${color}, 2px -2px ${color}, -2px 2px ${color}`;
  })
  .attr('fill', '#fff')
  .attr('transform', d => `rotate(${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI}) translate(0, ${-height / 2}) rotate(-${(d.endAngle + d.startAngle) / 2 * 180 / Math.PI})`);


}

export default {
    name: "ChordChart",
    mounted: function() {
        ChordChart();
    }
}

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
.chart #tooltip {
  pointer-events: none;
  position: absolute;
  opacity: 0;
  padding: 1rem;
  background: #fff;
  color: #303950;
  line-height: 2;
  transition: all 0.2s ease-out;
}
p {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
</style>