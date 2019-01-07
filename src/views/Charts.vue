<template>
  <div class="charts">
    <div class="md-layout">
      <div class="md-layout-item">
        <bubble-chart></bubble-chart>
      </div>
      <div class="md-layout-item">
        <chord-chart></chord-chart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from "@/components/BubbleChart.vue";
import ChordChart from "@/components/ChordChart.vue";

export default {
  name: "charts",
  components: {
    BubbleChart, ChordChart
  }
};
</script>

<style scoped lang="scss">
</style>