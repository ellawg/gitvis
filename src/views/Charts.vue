<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-header>
          <div class="md-title">Topics</div>
        </md-card-header>
        <md-card-content>
          <bubble-chart :data-arr="bubbleData"></bubble-chart>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-50 chart-card-container">
      <md-card>
        <md-card-header>
          <div class="md-title">Languages</div>
        </md-card-header>
        <md-card-content>
          <chord-chart
            :data-arr="chordData"
            :labels="chordLabels"
          ></chord-chart>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-100 chart-card-container">
      <repo-table :repo-data="repoData"></repo-table>
    </div>
  </div>
</template>

<script>
import BubbleChart from "../components/BubbleChart.vue";
import ChordChart from "../components/ChordChart.vue";
import RepoTable from "../components/RepoTable.vue";

export default {
  name: "Charts",
  components: {
    BubbleChart,
    ChordChart,
    RepoTable
  },
  props: {
    bubbleData: { type: Array, default: () => [] },
    chordData: { type: Array, default: () => [] },
    chordLabels: { type: Array, default: () => [] },
    repoData: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
.chart-card-container {
  margin-top: 24px;
}
</style>
