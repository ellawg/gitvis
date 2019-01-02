import firebase from "firebase/app";
import "firebase/auth";

import config from "../../firebaseConfig";

// Initialize firebase sdk
const fb = firebase.initializeApp(config);
const auth = fb.auth();

// Set up github auth provider
const githubProvider = new auth.GithubAuthProvider();
githubProvider.addScope("repo", "user");

export { auth, githubProvider };
