import { combineReducers } from "redux";
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_CHARTOFACCOUNT_FAILURE,
  FETCH_CHARTOFACCOUNT_REQUEST,
  FETCH_CHARTOFACCOUNT_SUCCESS,
} from "./action";

const menuReducer = (
  state = { loading: false, data: [], error: null },
  action
) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };
    case FETCH_MENU_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const itemReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ITEM_SUCCESS:
      console.log("Received data in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// const accountReducer = (
//   state = { loading: false, data: null, error: null },
//   action
// ) => {
//   switch (action.type) {
//     case FETCH_ACCOUNT_REQUEST:
//       return { ...state, loading: true, error: null };
//     case FETCH_ACCOUNT_SUCCESS:
//       console.log("Received data in reducer:", action.payload);
//       return { ...state, loading: false, data: action.payload, error: null };
//     case FETCH_ACCOUNT_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
const accountReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_CHARTOFACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHARTOFACCOUNT_SUCCESS:
      console.log("Received data in CHARTOFACCOUNT:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CHARTOFACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  item: menuReducer,
  itemlist: itemReducer,
  // AccountCodeList: accountReducer,
  accountlist: accountReducer,
});

export default rootReducer;
