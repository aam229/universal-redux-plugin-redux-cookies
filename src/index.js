import { hooks, environments, positions, register } from 'universal-redux/lib/hooks';
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
  if(props.data.cookies){
    return props;
  }
  return {
    ...props,
    data: {
      ...props.data,
      cookies: cookies.get()
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
      cookies: props.cookies
    }
  } ;
}, {
  environments: [
    environments.SERVER
  ],
  position: positions.BEFORE
});

