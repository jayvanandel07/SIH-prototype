import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from "./constants";

export const loginUser = (dispatch, payload) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const { email, password } = payload;
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

export const registerUser = (dispatch, payload) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const { email, password, name } = payload;
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

export const googleLogin = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({ type: AUTH_REQUEST });
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

