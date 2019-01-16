<template>
  <div class="md-layout-item md-size-100 md-gutter md-layout">
    <div class="md-layout-item md-size-100" v-if="$apollo.loading">Loading</div>
    <div class="md-layout-item" v-else>
      <charts
        :bubble-data="topics"
        :chord-data="chordData"
        :bar-data="repos"
        :chord-labels="languages"
      ></charts>
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

import Charts from "../views/Charts.vue";

export default {
  name: "SearchResults",
  components: { Charts },
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
