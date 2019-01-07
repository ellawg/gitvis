import store from "../store";

const proceed = (auth, next) => {
  const bool = auth ? store.state.auth : !store.state.auth;
  const to = auth ? "/" : "/search";
  if (bool) {
    next();
  } else {
    next(to);
  }
};

const privateRoute = (to, from, next) => {
  if (store.state.initialized) {
    proceed(true, next);
  } else {
    store.watch(
      state => state.initialized,
      () => {
        proceed(true, next);
      }
    );
  }
};

const publicOnly = (to, from, next) => {
  if (store.state.initialized) {
    proceed(false, next);
  } else {
    store.watch(
      state => state.initialized,
      () => {
        proceed(false, next);
      }
    );
  }
};

export { privateRoute, publicOnly };
