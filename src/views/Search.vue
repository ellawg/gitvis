<template>
  <div>
    <form
      form
      novalidate
      class="md-layout md-gutter md-alignment-canter-center"
      @submit.prevent="submit"
    >
      <md-card class="md-layout-item">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field md-inline>
                <label>query</label>
                <md-input v-model="query"></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
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
