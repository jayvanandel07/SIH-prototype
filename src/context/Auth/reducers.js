import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from "./constants";

export const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        user: null,
        isLoading: true,
        error: null,
      };

    case AUTH_SUCCESS:
      return {
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case AUTH_FAILURE:
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };

    default:
      return {
        user: null,
        isLoading: false,
        error: "Invalid User Auth",
      };
  }
};
