import { ADD_STOCK, ADD_STOCKS, REMOVE_STOCK } from "../constants/constants";

export const stockListReducer = (state, action) => {
    switch (action.type) {
        case ADD_STOCKS: {
            return {
                ...state,
                ...action.data
            };
        }
        case ADD_STOCK: {
            // TODO: remove local storage usage after BE integration 
            const localStorageStocks = JSON.parse(window.localStorage.getItem("stockList"));
            let updatedLocalStorageStocks = {
                ...localStorageStocks,
                [action.data.tradingSymbol]: action.data
            };
            window.localStorage.setItem("stockList", JSON.stringify(updatedLocalStorageStocks));
            return {
                ...state,
                [action.data.tradingSymbol]: action.data
            }
        }
        case REMOVE_STOCK: {
            // eslint-disable-next-line no-unused-vars
            const { [action.data.tradingSymbol]: deletedStock, ...newState } = state;
            // TODO: remove local storage usage after BE integration
            window.localStorage.setItem("stockList", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
}