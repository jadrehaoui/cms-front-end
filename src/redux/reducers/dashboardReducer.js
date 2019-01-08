import {
  FETCH_ALL_TABLES
} from '../actions/types';

import _ from 'lodash';
export default (state = {}, action) => {
  switch(action.type){
    case FETCH_ALL_TABLES:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    default:
      return state;
  }
}
