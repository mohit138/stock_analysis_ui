
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useScriptAlgorithms from '../../customHooks/useScriptAlgorithms';
import { useParams } from 'react-router-dom';
import { StockListContext } from '../../contexts/StockListContext';

const CandleStickComponent = (props) => {

    const { stockList } = useContext(StockListContext);
    let { tradingSymbol } = useParams();
    const selectedStock = stockList[tradingSymbol];

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

    const {
        generateResistancePrices,
        generateSupportPrices,
        generateCandlestickData,
        mergeCloseLevels
    } = useScriptAlgorithms();



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

            let lookLeft = 25;
            let lookRight = 25;

            if (["day", "week", "month"].includes(selectedStock?.interval)) {
                lookLeft = 20;
                lookRight = 20;
            }
            const supportData = generateSupportPrices(candleStickData, lookLeft, lookRight);
            const resistanceData = generateResistancePrices(candleStickData, lookLeft, lookRight);

            const mergedPriceLineData = mergeCloseLevels(supportData, resistanceData);
            mergedPriceLineData.forEach((priceLine) => {
                mainSeries.createPriceLine(priceLine);
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

CandleStickComponent.propTypes = {
    data: PropTypes.object,
    colors: PropTypes.object
}

export default CandleStickComponent;