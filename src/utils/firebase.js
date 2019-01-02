import firebase from "firebase/app";
import "firebase/auth";

import config from "../../firebaseConfig";

// Initialize firebase sdk
const fb = firebase.initializeApp(config);
const auth = fb.auth();

// Set up github auth provider
const githubProvider = new firebase.auth.GithubAuthProvider();

export { auth, githubProvider };
