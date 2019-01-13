<template>
  <div id="search-results" class="md-layout-item md-size-100 md-gutter md-layout">
    <div class="md-layout-item md-size-100" v-if="$apollo.loading">Loading</div>
    <div class="md-layout-item" v-else>
      <p>{{languages}}</p>
    </div>
  </div>
</template>

<script>
import SEARCH_QUERY from "../queries/SearchQuery.graphql";
import {
  topics,
  languages,
  formatChordData,
  repos
} from "../utils/dataMassage.js";

export default {
  name: "SearchResults",
  props: {
    query: { type: String, default: "" }
  },
  data() {
    return {
      minCount: 2,
      search: {}
    };
  },
  computed: {
    languages() {
      return languages(this.search, this.minCount);
    },
    topics() {
      return topics(this.search, this.minCount);
    },
    repos() {
      return repos(this.search);
    },
    chordData() {
      return formatChordData(this.languages);
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

<style lang="scss" scoped>
#search-results {
  margin: 24px auto;
}
</style>
