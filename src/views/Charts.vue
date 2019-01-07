<template>
  <div class="charts">
    <div class="md-layout">
      <div class="md-layout-item">
        <bubble-chart v-bind:data-arr="bubbleData"></bubble-chart>
      </div>
      <div class="md-layout-item">
        <chord-chart v-bind:data-arr="chordData"></chord-chart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from "@/components/BubbleChart.vue";
import ChordChart from "@/components/ChordChart.vue";
import { bubbleData, chordData } from "../utils/mockData.js";

export default {
  name: "charts",
  components: {
    BubbleChart,
    ChordChart
  },
  data: function() {
    return { bubbleData, chordData };
  }
};
</script>
