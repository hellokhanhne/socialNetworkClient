import authAPI from "../../api/authAPI";
import { setTokenHeader } from "../../until/setToken";
import { AUTH_LOGIN, AUTH_LOGOUT, LOAD_USER } from "../types/authType";
import { LoadingAction } from "./loadingAction";

const payloadSuccessAuth = (user, access_token) => ({
  type: AUTH_LOGIN,
  payload: {
    user,
    isAuthenticated: true,
    access_token,
  },
});

const setAccesssTokenStoreage = () => {
  localStorage.setItem("firstLogin", true);
};

export const registerAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.register(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setAccesssTokenStoreage();
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const login = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.login(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setAccesssTokenStoreage();
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const loginGoogleAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.loginGoogle(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setAccesssTokenStoreage();

    dispatch(LoadingAction(false));

    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};
export const loginFacebookAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.loginFacebook(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setAccesssTokenStoreage();
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const response = await authAPI.forgotPassword(payload);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const response = await authAPI.resetPassword(payload);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const loadingUser = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (!firstLogin)
    return dispatch({
      type: LOAD_USER,
      payload: null,
    });
  try {
    const response = await authAPI.getAccessToken();
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setAccesssTokenStoreage();
  } catch (error) {
    localStorage.removeItem("firstLogin");
    return dispatch({
      type: LOAD_USER,
      payload: null,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const response = await authAPI.logout();
    localStorage.removeItem("firstLogin");
    setTokenHeader(null);
    dispatch({
      type: AUTH_LOGOUT,
      payload: null,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};