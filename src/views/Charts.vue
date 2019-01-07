<template>
  <div class="charts">
      <chord-chart>

      </chord-chart>
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