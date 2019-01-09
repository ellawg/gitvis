<template>
  <div>
    <div v-if="$apollo.loading">Loading</div>
    <div v-else>{{languages}}</div>
  </div>
</template>

<script>
import SEARCH_RESULTS from "../queries/SearchResults.js";
import { topics, languages } from "../utils/dataMassage.js";

export default {
  name: "search-results",
  props: ["query"],
  data() {
    return {
      search: {}
    };
  },
  computed: {
    languages() {
      return this.$apollo.loading ? null : languages(this.search);
    },
    topics() {
      return this.$apollo.loading ? null : topics(this.search);
    }
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
