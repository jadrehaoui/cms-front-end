import {
  FETCH_ALL_TABLES,
  FETCH_TABLE_CONTENT,
  SOFT_DELETE_SELECTION,
  RESTORE,
  UNPUBLISH,
  PUBLISH,

  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from './types';
import server from '../api/server';
import history from '../history';
// import { capitalize } from '../capitalize';


export const fetchAllTables = () => async dispatch => {
  const response = await server.get('/dashboard/tables');
  dispatch({type: FETCH_ALL_TABLES, payload: response.data});
}
export const fetchTableContent = (tableName) => async dispatch => {
  const response = await server.post(`/${tableName}`, {userId: "5c2d0afa2bd4133f999ca43f"});
  dispatch({type: FETCH_TABLE_CONTENT, payload: response.data});
}
export const softDeleteSelection = (tableName, array) => async dispatch => {
  var body = {userId: "5c2d0afa2bd4133f999ca43f", delete: array};
  const response = await server.delete(`/products/soft/remove`,{data: body});
  dispatch({type: SOFT_DELETE_SELECTION, payload: response.data});
}
export const restoreItems = (tableName, array) => async dispatch => {
  var body = {userId: "5c2d0afa2bd4133f999ca43f", restore: array};
  const response = await server.post(`/products/restore`, body);
  dispatch({type: RESTORE, payload: response.data});
}
export const unpublishItems = (tableName, array) => async dispatch => {
  var body = {userId: "5c2d0afa2bd4133f999ca43f", unpublish: array};
  const response = await server.put(`/products/unpublish`, body);
  dispatch({type: UNPUBLISH, payload: response.data});
}
export const publishItems = (tableName, array) => async dispatch => {
  var body = {userId: "5c2d0afa2bd4133f999ca43f", publish: array};
  const response = await server.put(`/products/publish`, body);
  dispatch({type: PUBLISH, payload: response.data});
}

// PRODUCT CRUD
export const createProduct = formValues => async (dispatch, getState) => {
  const { userId } = "1"
  //getState().auth;
  const response = await server.post('/products ', {...formValues, userId});
  dispatch({ type: CREATE_PRODUCT, payload: response.data });
  //navigate to root route
  history.push('/products')
};
export const fetchProducts = () => async dispatch => {
  const response = await server.get('/products');
  dispatch({type: FETCH_PRODUCTS, payload: response.data});
}
export const fetchProduct = (id) => async dispatch => {
  const response = await server.get(`/products/${id}`);
  dispatch({type: FETCH_PRODUCT, payload: response.data});
}
export const editProduct = (id, formValues) => async dispatch => {
  const response = await server.patch(`/products/${id}`, formValues);
  dispatch({type: EDIT_PRODUCT, payload: response.data});
  history.push('/products');
}
export const deleteProduct = (id) => async dispatch => {
  await server.delete(`/products/${id}`);
  dispatch({type: DELETE_PRODUCT, payload: id});
  history.push('/products');
}
