import { intervalMapping } from "../../constants/constants";

const ListItem = ({ 
    stock,
    handleEditModalOpen,
    handleRemoveStock
 }) => {
    return (
        <div className="w-full bg-white p-2 rounded my-2 grid grid-cols-4 md:grid-cols-5 xl:text-lg border border-gray-200 hover:border-cyan-200 cursor-pointer ease-in-out duration-200" onClick={()=>{console.log("Click on stock")}}>
            <div className="hidden pl-4 pr-8 md:block">{stock.tradingSymbol}</div>
            <div className="px-8 col-span-2">{stock.name}</div>
            <div className="px-8 ">{intervalMapping[stock.interval]}</div>
            <div className="flex items-center justify-around">
                <button onClick={()=>handleEditModalOpen(stock)}><img className="h-5 xl:h-6" src="/assets/edit.png"/></button>
                <button onClick={()=>handleRemoveStock(stock)}><img className="h-4 xl:h-5" src="/assets/close.png" /></button>
            </div>
        </div>
    );
}

export default ListItem;