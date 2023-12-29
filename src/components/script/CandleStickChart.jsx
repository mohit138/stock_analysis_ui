
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CandleStickComponent = (props) => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    let maxPrice = 0;
    let minPrice = 10000000;

    const generateResistancePrices = () => {
        return ([
            {
                price: maxPrice,
                color: "#ef5350",
                title: "R",
                lineStyle: 0
            },
            {
                price: maxPrice - 50,
                color: "#ef5350",
                title: "R",
                lineStyle: 0
            }
        ])
    }

    const generateSupportPrices = () => {
        return ([
            {
                price: minPrice,
                color: "#26a69a",
                title: "S",
                lineStyle: 0
            },
            {
                price: minPrice + 50,
                color: "#26a69a",
                title: "S",
                lineStyle: 0
            }
        ])
    }

    const generateCandlestickData = (rawData) => {
        const reversedCandleData = rawData?.data?.candles?.map((candleArray) => {
            maxPrice = Math.max(maxPrice, candleArray[2]);
            minPrice = Math.min(minPrice, candleArray[3]);
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

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight, });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                    barSpacing: 10,
                },
                crosshair: {
                    mode: CrosshairMode.Normal,
                    vertLine: {
                    },
                    horzLine: {
                    },
                },
            });

            const candleStickData = generateCandlestickData(data);

            const mainSeries = chart.addCandlestickSeries();
            mainSeries.setData(candleStickData);

            mainSeries.priceScale().applyOptions({
                autoScale: false, // disables auto scaling based on visible content
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            });

            const supportData = generateSupportPrices();
            supportData.forEach((supportPriceLine) => {
                mainSeries.createPriceLine(supportPriceLine);
            });

            const resistanceData = generateResistancePrices();
            resistanceData.forEach((resistanceData) => {
                mainSeries.createPriceLine(resistanceData);
            });

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
            className='h-full border-2'
        />
    );
};

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


CandleStickComponent.propTypes = {
    data: PropTypes.object,
    colors: PropTypes.object
}

export default CandleStickComponent;