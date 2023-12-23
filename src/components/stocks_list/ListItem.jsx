import { intervalMapping } from "../../constants/constants";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ListItem = ({
    stock,
    handleEditModalOpen,
    handleRemoveStock
}) => {
    return (
        <div className="w-full bg-white p-2 rounded my-2 grid grid-cols-8 md:grid-cols-12 xl:text-lg border border-gray-300 ">
            <Link className="flex items-center justify-around " to={stock.tradingSymbol}>
                <img className="h-7 xl:h-8 p-[0.2rem] border border-gray-100 hover:border-teal-300 cursor-pointer ease-in-out duration-200" src="/assets/candle.png" />
            </Link>
            <div className="hidden pl-4 pr-8 col-span-2 md:flex items-center">{stock.tradingSymbol}</div>
            <div className="px-4 sm:px-8 col-span-5 sm:col-span-4 md:col-span-5 flex items-center ">{stock.name}</div>
            <div className="hidden px-8 col-span-2 md:col-span-3 sm:flex items-center">{intervalMapping[stock.interval]}</div>
            <div className="flex items-center justify-around col-span-2 sm:col-span-1">
                <button data-testid="edit-button" onClick={() => handleEditModalOpen(stock)}><img className="h-7 xl:h-8 p-[0.2rem] border border-gray-100 hover:border-teal-300 cursor-pointer ease-in-out duration-200" src="/assets/edit.png" /></button>
                <button data-testid="remove-button" onClick={() => handleRemoveStock(stock)}><img className="h-7 xl:h-8 p-[0.2rem] border border-gray-100 hover:border-teal-300 cursor-pointer ease-in-out duration-200" src="/assets/close.png" /></button>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    stock: PropTypes.shape({
        name: PropTypes.string.isRequired,
        instrumentKey: PropTypes.string.isRequired,
        tradingSymbol: PropTypes.string.isRequired,
        interval: PropTypes.string.isRequired
    }),
    handleEditModalOpen: PropTypes.func.isRequired,
    handleRemoveStock: PropTypes.func.isRequired
}

export default ListItem;