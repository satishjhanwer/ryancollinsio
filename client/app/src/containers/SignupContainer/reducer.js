import * as types from './constants';
import update from 'react-addons-update';

export const initialState = {
  error: null,
  isLoading: true,
  message: null,
};

const signupReducer =
  (state = initialState, action) => {
    switch (action.type) {
      case types.SIGNUP_SHOW_ERROR:
        return update(state, {
          error: {
            $set: action.error,
          },
          isLoading: {
            $set: false,
          },
        });
      case types.SIGNUP_SHOW_MESSAGE:
        return update(state, {
          message: {
            $set: action.message,
          },
          isLoading: {
            $set: false,
          },
        });
      case types.SIGNUP_CLEAR_ERROR:
        return update(state, {
          error: {
            $set: null,
          },
        });
      case types.SIGNUP_CLEAR_MESSAGE:
        return update(state, {
          message: {
            $set: null,
          },
        });
      case types.SIGNUP_SET_LOADING:
        return update(state, {
          isLoading: {
            $set: true,
          },
        });
      case types.SIGNUP_STOP_LOADING:
        return update(state, {
          isLoading: {
            $set: false,
          },
        });
      default:
        return state;
    }
  };

export default signupReducer;
