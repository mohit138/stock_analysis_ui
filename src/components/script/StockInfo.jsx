import { useContext } from "react";
import IntervalSelectDropdown from "../common/IntervalSelectDropdown";
import { StockListContext } from "../../contexts/StockListContext";
import PropTypes from 'prop-types';

const StockInfo = ({ selectedStock }) => {

    const { stockListContextAction: { addStock } } = useContext(StockListContext);

    const updateInterval = (newInterval) => {
        addStock(
            {
                ...selectedStock,
                interval: newInterval
            }
        );
    }

    return (
        <div className="grid grid-cols-12 items-center justify-evenly">
            <div className="col-span-12 text-lg py-4 md:col-span-6">{selectedStock?.name}</div>
            <div className="col-span-6 sm:col-span-4 md:col-span-3">{selectedStock?.tradingSymbol}</div>
            <div className="col-span-6 sm:col-span-4 md:col-span-3 w-full lg:w-2/4">
                <IntervalSelectDropdown defaultInterval={selectedStock?.interval} intervalUpdateHandler={updateInterval} />
            </div>
        </div>
    );
}

StockInfo.propTypes = {
    selectedStock: PropTypes.shape({
        name: PropTypes.string.isRequired,
        instrumentKey: PropTypes.string.isRequired,
        tradingSymbol: PropTypes.string.isRequired,
        interval: PropTypes.string.isRequired
    })
}

export default StockInfo;