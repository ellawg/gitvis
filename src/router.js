import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import { privateRoute, publicOnly } from "./utils/routeGuards";

const Search = () => import("./views/Search.vue");
const SearchResults = () => import("./components/SearchResults.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: publicOnly
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      beforeEnter: privateRoute,
      children: [
        {
          path: ":query",
          name: "search-query",
          component: SearchResults,
          props: true
        }
      ]
    }
  ]
});
