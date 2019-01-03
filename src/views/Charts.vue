<template>
  <div class="charts">
      <bubble-chart>

      </bubble-chart>
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from "@/components/BubbleChart.vue";

export default {
  name: "charts",
  components: {
    BubbleChart
  }
};
</script>

<style scoped lang="scss">
</style>