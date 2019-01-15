<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-content>
          <bubble-chart :data-arr="bubbleData"></bubble-chart>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-content>
          <chord-chart :data-arr="chordData" :labels="chordLabels"></chord-chart>
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
  name: "Charts",
  components: {
    BubbleChart,
    ChordChart,
    BarChart
  },
  props: {
    bubbleData: { type: Array, default: () => [] },
    chordData: { type: Array, default: () => [] },
    chordLabels: { type: Array, default: () => [] },
    barData: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
.chart-card-container {
  margin-top: 24px;
}
</style>
