<template>
  <div class="charts">
    <div class="md-layout">
      <div class="md-layout-item">
        <bubble-chart v-bind:data-arr="bubbleData"></bubble-chart>
      </div>
      <div class="md-layout-item">
        <chord-chart v-bind:data-arr="chordData" v-bind:labels="chordLabels"></chord-chart>
      </div>
      <div class="md-layout-item">
        <bar-chart></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from "@/components/BubbleChart.vue";
import ChordChart from "@/components/ChordChart.vue";
import BarChart from "@/components/BarChart.vue";

export default {
  name: "charts",
  components: {
    BubbleChart,
    ChordChart,
    BarChart
  },
  props: ["bubbleData", "chordData", "barData", "chordLabels"]
};
</script>
