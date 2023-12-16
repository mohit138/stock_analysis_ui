import { useState } from "react";
import { intervalMapping } from "../../constants/constants";
import { DisabledInput, Input } from "../common/Inputs";
import PrimaryButton from "../common/PrimaryButton";
import PrimaryCloseButton from "../common/PrimaryCloseButton";


const SelectDropdown = ({ stock, updateLocalStockInterval }) => {

    const [selectedItem, setSelectedItem] = useState(stock?.interval);
    const setInterval = (interval) =>{
        setSelectedItem(interval);
        updateLocalStockInterval(interval);
    }

    const options = Object.keys(intervalMapping).map((intervalKey) => {
        return (
            <option key={intervalKey} value={intervalKey}>{intervalMapping[intervalKey]}</option>
        );
    });

    return (
        <select name="cars"
            value={selectedItem}
            onChange={e => setInterval(e.target.value)}
            className="border-2 rounded-md border-gray-700 w-full bg-white px-2 py-1 ">
            {options}
        </select>
    );
}


const EditStockModal = ({
    stock,
    handleEditStock,
    setOpenEditModal
}) => {

    let updatedStock = stock;

    const updateLocalStockInterval = (newInterval) => {
        updatedStock.interval = newInterval;
    }

    return (
        <div className="absolute left-[15%] top-[20%] z-10 w-[70%] h-[60%] p-4 bg-white border-2 border-teal-600 sm:w-8/12">
            <div className="flex flex-col items-start justify-around h-full">
                <div className="flex flex-col items-start w-full">
                    <div className="pt-2 pb-2">Stock Name</div>
                    <DisabledInput value={stock?.name} />
                    <div className="pt-2 pb-2">Stock Instrument Key</div>
                    <DisabledInput value={stock?.instrumentKey} />
                    <div className="pt-2 pb-2">Stock Trading Symbol</div>
                    <DisabledInput value={stock?.tradingSymbol} />
                    <div className="pt-2 pb-2">Interval</div>
                    <SelectDropdown stock={stock} updateLocalStockInterval={updateLocalStockInterval}/>
                </div>

                <div className="py-4">
                    <PrimaryButton onClickHandler={() => handleEditStock(updatedStock)}>Save</PrimaryButton>
                    <PrimaryCloseButton onClickHandler={() => setOpenEditModal(false)}>Close</PrimaryCloseButton>
                </div>

            </div>

        </div>
    );
}

export default EditStockModal;