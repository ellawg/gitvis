<template>
  <div class="chart">
    <div id="bar-chart">
      <div
        class="block"
        v-for="item in items"
        v-bind:key="item.id"
        v-bind:style="{ width: (item.value*100) + '%', backgroundColor: item.color }"
      >
        <md-tooltip md-direction="top">{{item.lang + ' ' + item.value*100 + '%'}}</md-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ChordChart",
  data: function() {
    return {
      items: [
        { value: 0.2, id: 1, color: "#D7263D", lang: "JavaScript" },
        { value: 0.3, id: 2, color: "#5d5d5d", lang: "CSS" },
        { value: 0.4, id: 3, color: "#565656", lang: "HTML" },
        { value: 0.1, id: 4, color: "#191919", lang: "Vue" }
      ]
    };
  }
};
</script>
<style lang="scss">
#bar-chart {
  display: flex;
  flex-direction: row;
  height: 20px;
}

.block:hover {
  opacity: 0.65;
}

</style>
