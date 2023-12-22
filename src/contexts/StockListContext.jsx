import { createContext } from "react";
import { stockListReducer } from "../reducers/stockListReducer";
import { useReducer } from "react";
import { stockListActions } from "../actions/stockListActions";
import PropTypes from 'prop-types';  

export const StockListContext = createContext();

const StockListContextProvider = ({children}) => {
    const [stockList, dispatch] = useReducer(stockListReducer, {});

    const stockListContextAction = stockListActions(dispatch);

    return (
        <StockListContext.Provider value={{ stockList, stockListContextAction }}>
            {children}
        </StockListContext.Provider>
    )
}

StockListContextProvider.propTypes = {
    children: PropTypes.element
}

export default StockListContextProvider;