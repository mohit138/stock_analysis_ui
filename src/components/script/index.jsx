import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockListContext } from "../../contexts/StockListContext";
import dayjs from "dayjs";
import { durationMapping } from "../../constants/constants";
import StockInfo from "./StockInfo";
import CandleStickComponent from "./CandleStickChart";

const Script = () => {
    let { tradingSymbol } = useParams();

    const { stockList } = useContext(StockListContext);

    const selectedStock = stockList[tradingSymbol];

    const [candleData, setCandleData] = useState({});

    const getHistoricalData = () => {
        const duration = durationMapping[selectedStock?.interval];
        const toDate = dayjs().format('YYYY-MM-DD');
        const fromDate = dayjs(toDate).subtract(duration?.qty, duration?.unit).format('YYYY-MM-DD');
        fetch(`https://api-v2.upstox.com/historical-candle/${selectedStock?.instrumentKey}/${selectedStock?.interval}/${toDate}/${fromDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Api-Version": "2.0"
            }
        })
            .then(response => response.json())
            .then((data) => {
                setCandleData(data);
                console.log("hist data", data);
            })
            .catch(error => console.error(error));
    }

    const addCurrentDayData = () => {
        // if (["1minute", "30minute"].includes(selectedStock?.interval)) {
        //     fetch(`https://api-v2.upstox.com/historical-candle/intraday/${selectedStock?.instrumentKey}/${selectedStock?.interval}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json",
        //             "Api-Version": "2.0"
        //         }
        //     })
        //         .then(response => response.json())
        //         .then((data) => {
        //             console.log("interday data", data);
        //         })
        //         .catch(error => console.error(error));
        // } else if (["day", "week", "month"].includes(selectedStock?.interval)) {
        //     fetch(`https://api-v2.upstox.com/historical-candle/intraday/${selectedStock?.instrumentKey}/30minute`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json",
        //             "Api-Version": "2.0"
        //         }
        //     })
        //         .then(response => response.json())
        //         .then((data) => {
        //             // console.log(data);
        //         })
        //         .catch(error => console.error(error));
        // }
    }

    useEffect(() => {
        if (selectedStock) {

            getHistoricalData();
            addCurrentDayData();
        }
    }, [selectedStock]);

    return (
        <>
            {selectedStock &&
                <div className="p-4 md:p-8 lg:p-10">
                    <StockInfo selectedStock={selectedStock} />
                    <div className="h-[70vh]">
                        <CandleStickComponent data={candleData} />
                    </div>
                </div>
            }

        </>

    );
}

export default Script; 