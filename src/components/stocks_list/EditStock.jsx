import { DisabledInput } from "../common/Inputs";
import PrimaryButton from "../common/PrimaryButton";
import PrimaryCloseButton from "../common/PrimaryCloseButton";
import PropTypes from 'prop-types';
import IntervalSelectDropdown from "../common/IntervalSelectDropdown";

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
        <div data-testid="edit-modal" className="absolute left-[15%] top-[20%] z-10 w-[70%] h-[60%] p-4 bg-white border-2 border-teal-600 sm:w-8/12">
            <div className="flex flex-col items-start justify-around h-full">
                <div className="flex flex-col items-start w-full">
                    <div className="pt-2 pb-2">Stock Name</div>
                    <DisabledInput value={stock?.name} />
                    <div className="pt-2 pb-2">Stock Instrument Key</div>
                    <DisabledInput value={stock?.instrumentKey} />
                    <div className="pt-2 pb-2">Stock Trading Symbol</div>
                    <DisabledInput value={stock?.tradingSymbol} />
                    <div className="pt-2 pb-2">Interval</div>
                    <IntervalSelectDropdown defaultInterval={stock?.interval} intervalUpdateHandler={updateLocalStockInterval} />
                </div>

                <div className="py-4">
                    <PrimaryButton onClickHandler={() => handleEditStock(updatedStock)}>Save</PrimaryButton>
                    <PrimaryCloseButton onClickHandler={() => setOpenEditModal(false)}>Close</PrimaryCloseButton>
                </div>

            </div>

        </div>
    );
}

EditStockModal.propTypes = {
    stock: PropTypes.shape({
        name: PropTypes.string.isRequired,
        instrumentKey: PropTypes.string.isRequired,
        tradingSymbol: PropTypes.string.isRequired,
        interval: PropTypes.string.isRequired
    }),
    handleEditStock: PropTypes.func.isRequired,
    setOpenEditModal: PropTypes.func.isRequired
}

export default EditStockModal;