<template>
  <nav class="navbar" v-bind:style="{height: height + 'px'}">
    <div class="nav-section">
      <h3>gitvis</h3>
    </div>
    <div class="nav-section">
      <button v-if="auth" @click="logout">Logout</button>
      <button v-else @click="login">Login with GitHub</button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { auth } from "../utils/firebase.js";
import { SET_USER, SET_AUTH } from "../utils/mutations.js";

let unsubscribe;

export default {
  name: "navbar",
  props: ["height"],
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
    });
  },
  beforeDestroy() {
    unsubscribe();
  },
  computed: {
    ...mapState({
      auth: state => state.auth
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
    ...mapMutations([SET_AUTH, SET_USER])
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav-section {
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  align-content: center;
}
</style>
