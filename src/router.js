import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Charts from "./views/Charts.vue";
import { privateRoute, publicOnly } from "./utils/routeGuards";

const Search = () => import("./views/Search.vue");
const Visualization = () => import("./components/Visualization.vue");

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
          component: Visualization,
          props: true
        }
      ]
    },
    {
      path: "/charts",
      name: "charts",
      component: Charts
    }
  ]
});
