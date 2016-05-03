import cookies from 'js-cookie';

export const SET_COOKIES = 'cookies/SET';
export const DELETE_COOKIES = 'cookies/DELETE';

export const COOKIES_REDUCER = 'cookies';

export default function reducer(state = {}, action = {}) {
  switch(action.type){
    case SET_COOKIES: {
      const values = {};
      Object.keys(action.payload.values).forEach((key) => {
        cookies.set(key, action.payload.values[key], action.payload.options);
        values[key] = {
          value: action.payload.values[key],
          options: action.payload.options
        }
      });
      return {
        ...state,
        ...action.payload.values
      }
    }
    case DELETE_COOKIES: {
      state = {
        ...state
      };
      action.payload.keys.forEach((key) => {
        cookies.remove(key);
        delete state[key];
      });
      return state;
    }
  }
  return state;
}

export function deleteCookies(keys) {
  return {
    type: DELETE_COOKIES,
    payload: {
      keys
    }
  }
}

export function getCookie(state, name){

  return state[COOKIES_REDUCER][name] ? state[COOKIES_REDUCER][name].value : null;
}

export function setCookies(cookies, options){
  return {
    type: SET_COOKIES,
    payload: {
      values: cookies,
      options
    }
  }
}