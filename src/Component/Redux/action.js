import {
  fetchDataMenu,
  fetchDataGetUser,
  fetchDataGetCrystalCustomer,
  fetchDataGetCrystalMenu,
} from "./api";

export const FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST";
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

export const fetchMenu = (userId, code) => async (dispatch) => {
  dispatch({ type: FETCH_MENU_REQUEST });
  try {
    const data = await fetchDataMenu(userId, code);

    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};
export const FETCH_GETUSER_REQUEST = "FETCH_GETUSER_REQUEST";
export const FETCH_GETUSER_SUCCESS = "FETCH_GETUSER_SUCCESS";
export const FETCH_GETUSER_FAILURE = "FETCH_GETUSER_FAILURE";

export const fetchGetUser = (userId, code) => async (dispatch) => {
  dispatch({ type: FETCH_GETUSER_REQUEST });
  try {
    const data = await fetchDataGetUser(userId, code);
    console.log("The data i received is action data:", data);

    dispatch({ type: FETCH_GETUSER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETUSER_FAILURE, payload: error.message });
  }
};

export const FETCH_GETCRYSTALCUSTOMER_REQUEST =
  "FETCH_GETCRYSTALCUSTOMER_REQUEST";
export const FETCH_GETCRYSTALCUSTOMER_SUCCESS =
  "FETCH_GETCRYSTALCUSTOMER_SUCCESS";
export const FETCH_GETCRYSTALCUSTOMER_FAILURE =
  "FETCH_GETCRYSTALCUSTOMER_FAILURE";

export const fetchGetCrystalCustomer = () => async (dispatch) => {
  dispatch({ type: FETCH_GETCRYSTALCUSTOMER_REQUEST });
  try {
    const data = await fetchDataGetCrystalCustomer(null, null, "GET");
    console.log(data, "action.js fetchGetCrystalCustomer");
    dispatch({ type: FETCH_GETCRYSTALCUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCRYSTALCUSTOMER_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETCRYSTALMENU_REQUEST = "FETCH_GETCRYSTALMENU_REQUEST";
export const FETCH_GETCRYSTALMENU_SUCCESS = "FETCH_GETCRYSTALMENU_SUCCESS";
export const FETCH_GETCRYSTALMENU_FAILURE = "FETCH_GETCRYSTALMENU_FAILURE";

export const fetchGetCrystalMenu = () => async (dispatch) => {
  dispatch({ type: FETCH_GETCRYSTALMENU_REQUEST });
  try {
    const data = await fetchDataGetCrystalMenu(null, null, "GET");
    console.log(data, "action.js fetchGetCrystalMENU");
    dispatch({ type: FETCH_GETCRYSTALMENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCRYSTALMENU_FAILURE,
      payload: error.message,
    });
  }
};
