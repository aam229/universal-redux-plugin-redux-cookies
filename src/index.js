import { hooks, environments, positions, register } from 'universal-redux';
import cookies from 'js-cookie';

import reducer, {
  COOKIES_REDUCER
} from './reducer';

export * from './reducer';

register(hooks.CREATE_REDUX_REDUCER, function(data){
  return {
    ...data,
    reducers: {
      ...data.reducers,
      [COOKIES_REDUCER]: reducer
    }
  } ;
}, {
  environments: [
    environments.CLIENT,
    environments.SERVER
  ],
  position: positions.BEFORE
});

register(hooks.CREATE_REDUX_STORE, function(props){
  const internalCookies = cookies.get();
  if(props.data[COOKIES_REDUCER]){
    const storeCookies = props.data[COOKIES_REDUCER];
    Object.keys(internalCookies).forEach((key) => {
      if(!storeCookies[key]) cookies.remove(key)
    });
    Object.keys(props.data[COOKIES_REDUCER]).forEach((key) => {
      if(!internalCookies[key]){
        cookies.set(key, props.data[COOKIES_REDUCER][key].value, internalCookies[key].options);
      }
    });
    return props;
  }
  return {
    ...props,
    data: {
      ...props.data,
      [COOKIES_REDUCER]: createCookiesStore(internalCookies)
    }
  } ;
}, {
  environments: [
    environments.CLIENT
  ],
  position: positions.BEFORE
});

register(hooks.CREATE_REDUX_STORE, function(props){
  return {
    ...props,
    data: {
      ...props.data,
      [COOKIES_REDUCER]: createCookiesStore(props.cookies)
    }
  } ;
}, {
  environments: [
    environments.SERVER
  ],
  position: positions.BEFORE
});

function createCookiesStore(values){
  const storeCookies = {};
  Object.keys(values).forEach((key) => {
    storeCookies[key] = { value: values[key] };
  });
  return storeCookies;
}

