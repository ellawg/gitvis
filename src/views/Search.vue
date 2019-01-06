<template>
  <div>
    <form
      form
      novalidate
      class="md-layout md-gutter md-alignment-top-center"
      @submit.prevent="submit"
    >
      <md-card class="md-layout-item md-xsmall-size-100 md-size-80">
        <md-card-header>
          <div class="md-title">Search</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100 md-size-70">
              <md-field md-inline>
                <label>query</label>
                <md-input v-model="query"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-size-30">
              <md-field>
                <label>Number of results</label>
                <md-input v-model="nrOfResults" type="number"></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit">GO!</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      query: "",
      nrOfResults: 100
    };
  },
  methods: {
    submit() {
      this.$router.push("/search/" + this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

