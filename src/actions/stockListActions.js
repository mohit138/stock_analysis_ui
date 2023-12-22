import { ADD_STOCK, ADD_STOCKS, REMOVE_STOCK } from "../constants/constants"

export const stockListActions = (dispatch) => ({
    addStocks: (stocks) => {
        dispatch({ type: ADD_STOCKS, data: stocks });
    },
    addStock: (stock) => {
        dispatch({ type: ADD_STOCK, data: stock });
    },
    removeStock: (stock) => {
        dispatch({ type: REMOVE_STOCK, data: stock });
    }
})