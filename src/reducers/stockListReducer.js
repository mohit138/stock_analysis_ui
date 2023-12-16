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
            return {
                ...state,
                [action.data.name]: action.data
            }
        }
        case REMOVE_STOCK: {
            const { [action.data.name]: deletedStock , ...newState} = state;
            return newState;
        }
    }
}