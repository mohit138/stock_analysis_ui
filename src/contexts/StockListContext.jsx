import { createContext, useEffect } from "react";
import { stockListReducer } from "../reducers/stockListReducer";
import { useReducer } from "react";
import { stockListActions } from "../actions/stockListActions";

export const StockListContext = createContext();

const StockListContextProvider = (props) => {
    const [stockList, dispatch] = useReducer(stockListReducer, {});

    const stockListContextAction = stockListActions(dispatch);

    return (
        <StockListContext.Provider value={{ stockList, stockListContextAction }}>
            {props.children}
        </StockListContext.Provider>
    )
}

export default StockListContextProvider;