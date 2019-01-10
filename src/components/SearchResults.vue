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
  name: "SearchResults",
  props: {
    query: { type: String, default: "" }
  },
  data() {
    return {
      minCount: 2
    };
  },
  computed: {
    languages() {
      return this.$apollo.loading
        ? null
        : languages(this.search, this.minCount);
    },
    topics() {
      return this.$apollo.loading ? null : topics(this.search, this.minCount);
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
