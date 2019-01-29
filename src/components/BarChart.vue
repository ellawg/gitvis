<template>
  <div class="bar-chart">
    <div
      class="block"
      v-for="item in dataArray"
      :key="item.id"
      :style="{ width: (item.size * 100) + '%', backgroundColor: item.color }"
    >
      <md-tooltip md-direction="top">{{item.name + ' ' + Math.round(item.size * 100) + '%'}}</md-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChordChart",
  props: {
    dataArray: { type: Array, default: () => [] }
  },
  data: function() {
    return {
      items: [{ size: 0.2, id: 1, color: "#D7263D", name: "JavaScript" }]
    };
  }
};
</script>
<style lang="scss">
.bar-chart {
  display: flex;
  flex-direction: row;
  height: 20px;
}

.block:hover {
  opacity: 0.65;
}
</style>
