import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS
} from '../actions/types';

import _ from 'lodash';
export default (state = {}, action) => {
  switch(action.type){
    case CREATE_PRODUCT:
      return {...state, [action.payload.id]: action.payload}
    case EDIT_PRODUCT:
      return {...state, [action.payload.id]: action.payload};
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    case FETCH_PRODUCT:
      return {...state, [action.payload.id]: action.payload}
    case FETCH_PRODUCTS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    default:
      return state;
  }
}
