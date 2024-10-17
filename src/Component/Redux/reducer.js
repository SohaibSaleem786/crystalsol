import { combineReducers } from "redux";
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  FETCH_GETUSER_REQUEST,
  FETCH_GETUSER_SUCCESS,
  FETCH_GETUSER_FAILURE,
  FETCH_GETCRYSTALCUSTOMER_REQUEST,
  FETCH_GETCRYSTALCUSTOMER_SUCCESS,
  FETCH_GETCRYSTALCUSTOMER_FAILURE,
  FETCH_GETCRYSTALMENU_REQUEST,
  FETCH_GETCRYSTALMENU_SUCCESS,
  FETCH_GETCRYSTALMENU_FAILURE,
} from "./action";

const menuReducer = (
  state = { loading: false, data: [], error: null },
  { type, payload }
) => {
  switch (type) {
    case FETCH_MENU_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(payload) ? payload : [],
        error: null,
      };
    case FETCH_MENU_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

const GetUser = (
  state = { loading: false, data: [], error: null },
  { type, payload }
) => {
  console.log("The data i received is reducer GetUser:", payload);

  switch (type) {
    case FETCH_GETUSER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GETUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(payload) ? payload : [],
        error: null,
      };
    case FETCH_GETUSER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

const GetCrystalCustomer = (
  state = { loading: false, data: [], error: null },
  { type, payload }
) => {
  console.log("The data i received is:", payload);
  switch (type) {
    case FETCH_GETCRYSTALCUSTOMER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GETCRYSTALCUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(payload) ? payload : [],
        error: null,
      };
    case FETCH_GETCRYSTALCUSTOMER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

const GetCrystalMenu = (
  state = { loading: false, data: [], error: null },
  { type, payload }
) => {
  console.log("The data i received is:", payload);
  switch (type) {
    case FETCH_GETCRYSTALMENU_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GETCRYSTALMENU_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(payload) ? payload : [],
        error: null,
      };
    case FETCH_GETCRYSTALMENU_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  item: menuReducer,
  getuser: GetUser,
  getcrystalcustomer: GetCrystalCustomer,
  getcrystalmenu: GetCrystalMenu,
});

export default rootReducer;
