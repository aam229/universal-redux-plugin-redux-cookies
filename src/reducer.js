import cookies from 'js-cookie';

export const SET_COOKIES = 'cookies/SET';
export const INITIALIZE_COOKIES = 'cookies/INITIALIZE';

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
  }
  return state;
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