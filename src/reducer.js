import cookies from 'js-cookie';

export const SET_COOKIES = 'cookies/SET';
export const DELETE_COOKIES = 'cookies/DELETE';

export const COOKIES_REDUCER = 'cookies';

export default function reducer(state = {}, action = {}) {
  switch(action.type){
    case SET_COOKIES: {
      Object.keys(action.payload.values).forEach((key) => {
        cookies.set(key, action.payload.values[key], { expires: action.payload.expires });
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
  if(!name){
    return state[COOKIES_REDUCER];
  }
  return state[COOKIES_REDUCER] ? state[COOKIES_REDUCER][name] : null;
}

export function setCookies(cookies, expires){
  return {
    type: SET_COOKIES,
    payload: {
      values: cookies,
      expires: expires
    }
  }
}