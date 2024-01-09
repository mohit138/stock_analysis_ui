import { colorSchema } from "../constants/constants";

const getColorForCount = (count, type = "support") => {
    if (type === "support") {
        if (count <= 2) {
            return (colorSchema.weakSupport);
        } else if (count <= 4) {
            return (colorSchema.decentSupport);
        } else {
            return (colorSchema.strongSupport);
        }
    } else if (type === "resistance") {
        if (count <= 2) {
            return (colorSchema.weakResistance);
        } else if (count <= 4) {
            return (colorSchema.decentResistance);
        } else {
            return (colorSchema.strongResistance);
        }
    }
}

const useScriptAlgorithms = () => {

    const mergeCloseLevels = (supportData = [], resistanceData = []) => {
        const mergedData = [...supportData, ...resistanceData];
        const mergedPrices = [];

        if (mergedData.length === 0) return [];

        mergedData.sort((a, b) => {
            const priceA = a?.price;
            const priceB = b?.price;
            if (priceA < priceB) {
                return -1;
            }
            if (priceA > priceB) {
                return 1;
            }
            return 0;
        });

        const priceThreshold = (mergedData[mergedData.length - 1]?.price) * 0.01;

        let mergedDataIndex = 0;

        while (mergedDataIndex < mergedData.length) {
            let lowerLimit = mergedData[mergedDataIndex]?.price;
            mergedDataIndex++;
            let priceSum = lowerLimit;
            let counter = 1;
            let latestTime = mergedData[mergedDataIndex]?.time;
            let latestType = mergedData[mergedDataIndex]?.type;
            while (mergedDataIndex < mergedData.length && mergedData[mergedDataIndex]?.price <= lowerLimit + priceThreshold) {
                priceSum += mergedData[mergedDataIndex]?.price;
                counter++;
                mergedDataIndex++;
                if(latestTime<mergedData[mergedDataIndex]?.time){
                    latestTime = mergedData[mergedDataIndex]?.time;
                    latestType = mergedData[mergedDataIndex]?.type;
                }
            }

            let avgPrice = priceSum / counter;

            mergedPrices.push({
                price: avgPrice,
                color: getColorForCount(counter, latestType),
                lineStyle: 0,
                axisLabelVisible: (counter>2)?true:false,
                lineWidth: 2,
                title: `Strong ${latestType} (${counter} times)`,
            })
        }

        return mergedPrices;
    }

    const generateResistancePrices = (candleStickData = [], leftCandles = 5, rightCandles = 5) => {
        const resistancePrices = [];
        let noOfCandles = candleStickData.length;

        let maxResistancePrice = 0;

        for (let i = leftCandles; i < noOfCandles - rightCandles; i++) {
            let maxVal = 0;
            for (let j = i - leftCandles; j < i + rightCandles + 1; j++) {
                maxVal = Math.max(maxVal, candleStickData[j]?.high);
            }
            maxResistancePrice = Math.max(maxResistancePrice, Math.floor(candleStickData[i]?.high));
            if (candleStickData[i]?.high === maxVal) {
                resistancePrices.push({
                    price: Math.floor(candleStickData[i]?.high),
                    type: "resistance",
                    time: candleStickData[i]?.time
                });
            }
        }

        for (let i = noOfCandles - rightCandles; i < noOfCandles; i++) {
            maxResistancePrice = Math.max(maxResistancePrice, Math.floor(candleStickData[i]?.high));
        }

        let hasLatestMax = false;
        let latestMaxDate;
        for (let i = noOfCandles - rightCandles; i < noOfCandles; i++) {
            if(maxResistancePrice>candleStickData[i]?.high){
                maxResistancePrice = candleStickData[i]?.high;
                hasLatestMax = true;
                latestMaxDate = candleStickData[i]?.time;
            }
        }

        if(hasLatestMax){
            resistancePrices.push({
                price: Math.floor(maxResistancePrice),
                type: "resistance",
                time: latestMaxDate
            });
        }

        return (resistancePrices);
    }

    const generateSupportPrices = (candleStickData = [], leftCandles = 5, rightCandles = 5) => {
        const supportPrices = [];
        let noOfCandles = candleStickData.length;

        let minSupportPrice = 10000000;

        for (let i = leftCandles; i < noOfCandles - rightCandles; i++) {
            let minVal = 10000000;
            for (let j = i - leftCandles; j < i + rightCandles + 1; j++) {
                minVal = Math.min(minVal, candleStickData[j]?.low);
            }
            minSupportPrice = Math.min(minSupportPrice, Math.floor(candleStickData[i]?.low));
            if (candleStickData[i]?.low === minVal) {
                supportPrices.push({
                    price: Math.floor(candleStickData[i]?.low),
                    type: "support",
                    time: candleStickData[i]?.time
                });
            }
        }

        let hasLatestMin = false;
        let latestMinDate;
        for (let i = noOfCandles - rightCandles; i < noOfCandles; i++) {
            if(minSupportPrice>candleStickData[i]?.low){
                minSupportPrice = candleStickData[i]?.low;
                hasLatestMin = true;
                latestMinDate = candleStickData[i]?.time;
            }
        }

        if(hasLatestMin){
            supportPrices.push({
                price: Math.floor(minSupportPrice),
                type: "support",
                time: latestMinDate
            });
        }

        return (supportPrices);
    }

    const generateCandlestickData = (rawData) => {

        const reversedCandleData = rawData?.data?.candles?.map((candleArray) => {
            const modifiedDate = new Date(candleArray[0]);
            // to convert to UTC + 5:30, and chart in IST
            modifiedDate.setHours(modifiedDate.getHours() + 5);
            modifiedDate.setMinutes(modifiedDate.getMinutes() + 30);

            return ({
                time: modifiedDate / 1000,
                open: candleArray[1],
                high: candleArray[2],
                low: candleArray[3],
                close: candleArray[4]
            });
        });
        let filteredCandleData = reversedCandleData?.reverse();

        if (!filteredCandleData) {
            filteredCandleData = initialDummyData
        }
        return (filteredCandleData);
    }

    return ({
        generateResistancePrices,
        generateSupportPrices,
        generateCandlestickData,
        mergeCloseLevels
    });
}

const initialDummyData = [
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }
];

export default useScriptAlgorithms;