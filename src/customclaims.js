import { getAuth, getUser, setCustomUserClaims } from "firebase-admin/auth";

// Get a reference to the Auth service
const auth = getAuth();