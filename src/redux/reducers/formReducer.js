import {
  GET_FORM
} from '../actions/types';

import _ from 'lodash';
export default (state = {}, action) => {
  switch(action.type){
    case GET_FORM:
      return {...state, fields: action.payload};
    default:
      return state;
  }
}
