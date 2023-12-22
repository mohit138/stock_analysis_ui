import { useContext } from "react";
import PrimaryButton from "../common/PrimaryButton";
import ListItem from "./ListItem";
import AddStockModal from "./AddStock";
import { StockListContext } from "../../contexts/StockListContext";
import EditStockModal from "./EditStock";
import useStocksList from "../../customHooks/useStocksList";



const StocksList = () => {

    const { stockList } = useContext(StockListContext);

    const {
        openAddModal,
        openEditModal,
        setOpenEditModal,
        stockToEdit,
        handleAddModalToggle,
        handleAddStock,
        handleEditStock,
        handleEditModalOpen,
        handleRemoveStock
    } = useStocksList();

    const listItems = Object.keys(stockList).map((
        name
    ) => {
        return (
            <ListItem key={name} stock={stockList[name]} handleEditModalOpen={handleEditModalOpen} handleRemoveStock={handleRemoveStock} />
        );
    })

    return (
        <>
            {(openEditModal || openAddModal) && <div className="w-screen h-screen z-5 opacity-50 absolute bg-gray-100"></div>}
            {openEditModal && <EditStockModal stock={stockToEdit} handleEditStock={handleEditStock} setOpenEditModal={setOpenEditModal} />}
            {openAddModal && <AddStockModal handleModalToggle={handleAddModalToggle} handleAddStock={handleAddStock} />}
            <div className="bg-gray-200 p-4 m-1 rounded">
                <div className="flex items-center">
                    <div className="text-lg pr-4 ">Stocks</div>
                    <PrimaryButton onClickHandler={handleAddModalToggle}>Add</PrimaryButton>
                </div>
                {listItems}
            </div>
        </>

    );
}

export default StocksList; 