<template>
  <md-table v-model="repoData" md-card>
    <md-table-toolbar>
      <h1 class="md-title">Repositories</h1>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Name">
        <a :href="item.url">{{ item.name }}</a>
      </md-table-cell>
      <md-table-cell md-label="Stars" md-numeric>{{ item.stars }}</md-table-cell>
      <md-table-cell md-label="Forks" md-numeric>{{ item.forks }}</md-table-cell>
      <md-table-cell class="repo-chart" md-label="Languages">
        <bar-chart :data-array="item.languages"></bar-chart>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
export default {
  name: "RepoTable",
  components: { BarChart },
  props: {
    repoData: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
.repo-chart {
  width: 50%;
}
</style>
