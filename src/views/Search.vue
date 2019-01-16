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
                <div class="md-layout-item md-size-50">Languages topics</div>
                <div class="md-layout-item md-size-50">Topics</div>
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
export default {
  name: "Search",
  data() {
    return {
      query: ""
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
