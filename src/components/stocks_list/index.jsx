import { useContext, useEffect, useState } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import ListItem from "./ListItem";
import AddStockModal from "./AddStock";
import { StockListContext } from "../../contexts/StockListContext";
import EditStockModal from "./EditStock";



const StocksList = () => {

    const { stockList, stockListContextAction:{addStock, removeStock}} = useContext(StockListContext);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [stockToEdit, setStockToEdit] = useState({});


    const handleAddModalToggle = () => {
        setOpenAddModal(!openAddModal);
    }

    const handleAddStock = (stock) => {
        addStock({
            ...stock,
            interval:'30minute'
        });
        setOpenAddModal(false);
    }

    const handleEditStock = (stock) => {
        addStock(stock);
        setOpenEditModal(false);
    }

    const handleEditModalOpen = (stock) => {
        setStockToEdit(stock);
        setOpenEditModal(true);
    }

    const handleRemoveStock = (stock) => {
        removeStock(stock);
    }

    const listItems = Object.keys(stockList).map((
        name
    ) => {
        return (
            <ListItem key={name} stock={stockList[name]} handleEditModalOpen={handleEditModalOpen} handleRemoveStock={handleRemoveStock}/>
        );
    })

    return (
        <>
            { (openEditModal || openAddModal) && <div className="w-screen h-screen z-5 opacity-50 absolute bg-gray-100"></div>}
            {openEditModal && <EditStockModal stock={stockToEdit} handleEditStock={handleEditStock} setOpenEditModal={setOpenEditModal}/>}
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