import { useContext, useEffect, useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import PrimaryCloseButton from "../common/PrimaryCloseButton";
import { StockListContext } from "../../contexts/StockListContext";
import { ADD_STOCK } from "../../constants/constants";
import { Input } from "../common/Inputs";

function List({ data, selectStockHandler }) {
    data.splice(20);
    return (
        <ul>
            {data.map((item) => (
                <li className="px-2 border rounded-sm cursor-default" onClick={()=>selectStockHandler(item)}>{item.tradingSymbol} | {item.name}</li>
            ))}
        </ul>
    )
}


const AddStockModal = ({ handleModalToggle, handleAddStock }) => {
    

    const [searchResult, setSearchResult] = useState([]);
    const [nseStockData, setNseStockData] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [selectedStock, setSelectedStock] = useState(null);
    const [isResultsVisible, setIsResukltsVisible] = useState(true);

    useEffect(() => {
        fetch('NSE.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => setNseStockData(data))
            .catch(error => console.error(error));
    }, []);

    const searchHandler = (input) => {
        setSearchInput(input);
        let filteredSearchData = [];
        if (input !== '') {
            filteredSearchData = nseStockData.filter((stock) => {
                return (stock.name.toLowerCase().includes(input.toLowerCase()) || stock.tradingSymbol.toLowerCase().includes(input.toLowerCase()));
            });
        }
        setSearchResult(filteredSearchData);
        setIsResukltsVisible(true);
    }

    const selectStockHandler = (stock) => {
        setSelectedStock(stock);
        setIsResukltsVisible(false);
    }

    const addSelectedStock = () => {
        handleAddStock(selectedStock)
    }

    return (
        <div className="absolute left-[15%] top-[20%] z-10 w-[70%] h-[60%] p-4 bg-white border-2 border-teal-600 sm:w-8/12 ease-in-out duration-500">
            <div className="flex flex-col items-start justify-around h-full">
                <div className="flex flex-col items-start w-full">
                    <div className="py-4">Please search for the Stock</div>
                    <Input value={searchInput} onChange={(e) => searchHandler(e.target.value)}/>
                    {isResultsVisible && <div className="h-40 w-full rounded-md border-gray-400 overflow-auto">
                        <List data={searchResult} selectStockHandler={selectStockHandler}/>
                    </div>}
                    { !isResultsVisible && <div className="h-40 w-full py-4">Selected Stock - {selectedStock.name}</div>}
                </div>
                
                <div>
                    <PrimaryButton onClickHandler={addSelectedStock} disabled={selectedStock===null?true:false} >Add</PrimaryButton>
                    <PrimaryCloseButton onClickHandler={handleModalToggle}>Close</PrimaryCloseButton>
                </div>

            </div>

        </div>
    );
}

export default AddStockModal;