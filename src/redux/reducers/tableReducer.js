import {
  FETCH_TABLE_CONTENT,
  SOFT_DELETE_SELECTION,
  PUBLISH,
  UNPUBLISH,
  RESTORE
} from '../actions/types';

import _ from 'lodash';
export default (state = {}, action) => {
  switch(action.type){
    case FETCH_TABLE_CONTENT:
      return {...state, content: action.payload.obj};
    case SOFT_DELETE_SELECTION:
      return {...state, deleted: action.payload};
    case PUBLISH:
      return {...state, published: action.payload};
    case UNPUBLISH:
      return {...state, unpublished: action.payload};
    case RESTORE:
      return {...state, restored: action.payload};
    default:
      return state;
  }
}
