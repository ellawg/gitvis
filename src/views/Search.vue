<template>
  <div class="md-layout md-alignment-center-center">
    <div id="search" class="md-layout-item md-size-100 md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Search</div>
          </md-card-header>
          <md-card-content>
            <form form novalidate @submit.prevent="submit">
              <div class="md-layout">
                <div class="md-layout-item md-size-50">
                  <md-field md-inline>
                    <label>query</label>
                    <md-input v-model="query"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-50">Slider</div>
                <div class="md-layout-item md-size-50">
                  <md-chip
                    v-for="topic in topics"
                    :key="topic"
                    class="md-accent"
                    md-deletable
                    @md-delete="filterToggle({type: 'topics', value: topic})"
                  >{{topic}}</md-chip>
                </div>
                <div class="md-layout-item md-size-50">
                  <md-chip
                    v-for="lang in languages"
                    :key="lang"
                    class="md-primary"
                    md-deletable
                    @md-delete="filterToggle({type: 'languages', value: lang})"
                  >{{lang}}</md-chip>
                </div>
              </div>
            </form>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...mapState({
      languages: state => state.filters.languages,
      topics: state => state.filters.topics
    })
  },
  methods: {
    ...mapActions(["filterToggle"]),
    submit() {
      this.$router.push("/search/" + this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
