<template>
  <div class="home">
    <md-empty-state md-icon="insert_chart" md-label="Login with GitHub to start">
      <md-button v-if="!isLoading && initialized" @click="login" class="md-raised">Login</md-button>
      <md-progress-spinner v-else-if="isLoading && initialized" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </md-empty-state>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapState(["initialized"]),
    ...mapGetters(["isLoading"])
  },
  methods: {
    login() {
      this.githubLogin(this.$apollo.provider.defaultClient);
    },
    ...mapActions(["githubLogin"])
  }
};
</script>

<style lang="scss" scoped>
</style>

