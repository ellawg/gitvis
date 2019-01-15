<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-content>
          <bubble-chart v-bind:data-arr="bubbleData"></bubble-chart>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-content>
          <chord-chart v-bind:data-arr="chordData" v-bind:labels="chordLabels"></chord-chart>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-100 chart-card-container">
      <md-card>
        <md-card-content>
          <bar-chart></bar-chart>
        </md-card-content>
      </md-card>
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

<style lang="scss" scoped>
.chart-card-container {
  margin-top: 24px;
}
</style>
