<template>
  <div>
    <div v-if="$apollo.loading">Loading</div>
    <div v-else>{{languages}}</div>
  </div>
</template>

<script>
import SEARCH_QUERY from "../queries/SearchQuery.graphql";
import { topics, languages, formatChordData } from "../utils/dataMassage.js";

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
    },
    chordData() {
      return this.languages ? formatChordData(this.languages) : null;
    }
  },
  apollo: {
    search: {
      query: SEARCH_QUERY,
      variables() {
        return {
          query: this.query
        };
      }
    }
  }
};
</script>
