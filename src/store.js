import Vue from "vue";
import Vuex from "vuex";

import { auth, githubProvider } from "./utils/firebase";
import { onLogin, onLogout } from "./vue-apollo";
import {
  SET_AUTH,
  SET_USER,
  SET_LOADING,
  SET_INITIALIZED
} from "./utils/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    user: null,
    loading: {
      login: false,
      logout: false
    },
    initialized: false
  },
  getters: {
    isLoading(state) {
      return Object.values(state.loading).reduce(
        (acc, curr) => (curr ? curr : acc)
      );
    }
  },
  mutations: {
    [SET_AUTH](state, auth) {
      state.auth = auth;
      if (!auth) {
        state.user = null;
      }
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_LOADING](state, { name, loading }) {
      state.loading[name] = loading;
    },
    [SET_INITIALIZED](state, bool) {
      state.initialized = bool;
    }
  },
  actions: {
    async githubLogin({ commit }, apolloClient) {
      commit(SET_LOADING, { name: "login", loading: true });
      let result;
      try {
        result = await auth.signInWithPopup(githubProvider);
      } catch (error) {
        // TODO: Handle error
        console.log("signin error: ", error.message);
        return;
      }
      if (result.credential.accessToken) {
        await onLogin(apolloClient, result.credential.accessToken);
      }
      commit(SET_LOADING, { name: "login", loading: false });
    },
    async githubLogout({ commit }, apolloClient) {
      commit(SET_LOADING, { name: "logout", loading: true });
      try {
        await auth.signOut();
        await onLogout(apolloClient);
      } catch (error) {
        // TODO: Handle error
        console.log("signout error: ", error.message);
        return;
      }
      commit(SET_LOADING, { name: "logout", loading: false });
    }
  }
});
