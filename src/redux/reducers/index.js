import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productReducer from './productReducer';
import dashboardReducer from './dashboardReducer';
import tableReducer from './tableReducer';
export default combineReducers({
  products: productReducer,
  tables: dashboardReducer,
  tableState: tableReducer,
})
