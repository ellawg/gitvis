<template>
  <div class="md-toolbar-row">
    <div class="md-toolbar-section-start">
      <h3 class="md-title">gitvis</h3>
    </div>
    <div v-if="auth && initialized" class="md-toolbar-section-end">
      <md-button @click="logout">Logout</md-button>
      <md-avatar class="avatar">
        <img :src="avatar" alt>
        <md-tooltip md-direction="bottom">{{userName}}</md-tooltip>
      </md-avatar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { auth } from "../utils/firebase.js";
import { SET_USER, SET_AUTH, SET_INITIALIZED } from "../utils/mutations.js";

let unsubscribe;

export default {
  name: "navbar",
  mounted() {
    unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // If the user is logged in
        this[SET_USER](user);
        this[SET_AUTH](true);
      } else {
        // If no user is logged in
        this[SET_AUTH](false);
      }
      this[SET_INITIALIZED](true);
    });
  },
  beforeDestroy() {
    unsubscribe();
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      initialized: state => state.initialized,
      avatar: state => (state.user ? state.user.photoURL : null),
      userName: state => (state.user ? state.user.displayName : null)
    })
  },
  methods: {
    login() {
      this.githubLogin(this.$apollo.provider.defaultClient);
    },
    logout() {
      this.githubLogout(this.$apollo.provider.defaultClient);
    },
    ...mapActions(["githubLogin", "githubLogout"]),
    ...mapMutations([SET_AUTH, SET_USER, SET_INITIALIZED])
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  margin: 0 8px;
}
</style>
