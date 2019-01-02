import Vue from "vue";
import Vuex from "vuex";

import { auth, githubProvider } from "./utils/firebase";
import { onLogin, onLogout } from "./vue-apollo";

Vue.use(Vuex);

const authState = {
  signedIn: false,
  token: ""
};

export default new Vuex.Store({
  state: {
    auth: authState,
    user: null,
    loading: false
  },
  mutations: {
    signIn(state, token) {
      state.auth = {
        signedIn: true,
        token
      };
    },
    signOut(state) {
      state.auth = authState;
      state.user = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async githubLogin({ commit }, apolloClient) {
      commit("setLoading", true);
      let result;
      try {
        result = await auth.signInWithPopup(githubProvider);
      } catch (error) {
        // TODO: Handle error
        return;
      }
      if (result.credential.accessToken) {
        const { token } = result.credential;
        await onLogin(apolloClient, token);
        commit("signIn", token);
        commit("setUser", result.user);
      }
      commit("setLoading", false);
    },
    async githubLogout({ commit }, apolloClient) {
      commit("setLoading", true);
      try {
        await auth.signOut();
        await onLogout(apolloClient);
      } catch (error) {
        // TODO: Handle error
        return;
      }
      commit("signOut");
      commit("setLoading", false);
    }
  }
});
