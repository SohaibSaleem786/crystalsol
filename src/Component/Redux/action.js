import { fetchDataMenu, fetchDataItem, fetchDataAccountCode ,fetchDataChartofAccount } from "./api";

export const FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST";
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

export const fetchMenu = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_MENU_REQUEST });

  try {
    // Log the user ID to the console for verification
    console.log("Fetching data for user ID:", userId);

    const data = await fetchDataMenu(userId);

    // Log the fetched data to the console
    console.log("Fetched data:", data);

    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching data:", error);

    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};

export const FETCH_ITEM_REQUEST = "FETCH_ITEM_REQUEST";
export const FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAILURE = "FETCH_ITEM_FAILURE";

export const fetchItem = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEM_REQUEST });

  try {
    const data = await fetchDataItem();
    console.log("Data fetched for fetchItem:", data);
    dispatch({ type: FETCH_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ITEM_FAILURE, payload: error.message });
  }
};

export const FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE";

export const fetchAccount = () => async (dispatch) => {
  dispatch({ type: FETCH_ACCOUNT_REQUEST });

  try {
    const data = await fetchDataAccountCode();
    console.log("Data fetched for :", data);
    dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ACCOUNT_FAILURE, payload: error.message });
  }
};




export const FETCH_CHARTOFACCOUNT_REQUEST = "FETCH_CHARTOFACCOUNT_REQUEST";
export const FETCH_CHARTOFACCOUNT_SUCCESS = "FETCH_CHARTOFACCOUNT_SUCCESS";
export const FETCH_CHARTOFACCOUNT_FAILURE = "FETCH_CHARTOFACCOUNT_FAILURE";

export const fetchChartofAccount = () => async (dispatch) => {
  dispatch({ type: FETCH_CHARTOFACCOUNT_REQUEST });

  try {
    const data = await fetchDataChartofAccount();
    console.log("Data fetched for CHARTOFACCOUNT:", data);
    dispatch({ type: FETCH_CHARTOFACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CHARTOFACCOUNT_FAILURE, payload: error.message });
  }
};