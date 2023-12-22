import { useContext, useState } from "react";
import { StockListContext } from "../contexts/StockListContext";

const useStocksList = () => {

    const { stockListContextAction: { addStock, removeStock } } = useContext(StockListContext);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [stockToEdit, setStockToEdit] = useState({});


    const handleAddModalToggle = () => {
        setOpenAddModal(!openAddModal);
    }

    const handleAddStock = (stock) => {
        addStock({
            ...stock,
            interval: '30minute'
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

    return ({
        openAddModal,
        openEditModal,
        setOpenEditModal,
        stockToEdit,
        handleAddModalToggle,
        handleAddStock,
        handleEditStock,
        handleEditModalOpen,
        handleRemoveStock
    });
}

export default useStocksList;
