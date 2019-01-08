<template>
  <div>
    <div v-if="$apollo.loading">Loading</div>
    <div v-else>{{search}}</div>
  </div>
</template>

<script>
import SEARCH_RESULTS from "../queries/SearchResults.gql";

export default {
  name: "search-results",
  props: ["query"],
  data() {
    return {
      search: {}
    };
  },
  apollo: {
    search: {
      query: SEARCH_RESULTS,
      variables() {
        return {
          query: this.query
        };
      }
    }
  }
};
</script>

