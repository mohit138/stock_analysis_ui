/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import Script from "../../../src/components/script";
import "@testing-library/jest-dom";
import { StockListContext } from "../../../src/contexts/StockListContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { durationMapping } from "../../../src/constants/constants";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";

describe('testing stock lists', () => {

    const mockAddStock = jest.fn();
    const contextValue = {
        stockList: {
            "symbol1": {
                name: "name1",
                tradingSymbol: "symbol1",
                instrumentKey: "key1",
                interval: "30minute"
            }
        },
        stockListContextAction: {
            addStock: mockAddStock,
            addStocks: jest.fn(() => { })
        }
    }

    const mockDataResponse = {
        "status": "success",
        "data": {
            "candles": [["2023-09-29T15:15:00+05:30", 3160.65, 3168, 3160, 3166, 175348, 0], ["2023-09-29T14:45:00+05:30", 3159, 3167.5, 3158.1, 3160.6, 545167, 0], ["2023-09-29T14:15:00+05:30", 3159.8, 3167.9, 3159, 3159, 105289, 0]]
        }
    }

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockDataResponse)
    }));

    beforeEach(() => {
        fetch.mockClear();
    });


    it('testing initial render and api call', async () => {

        const routes = [
            {
                path: "stocks/:tradingSymbol",
                element: <StockListContext.Provider value={contextValue}>
                    <Script />
                </StockListContext.Provider>
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/stocks", "/stocks/symbol1"],
            initialIndex: 1,
        });

        await act(async () => render(<RouterProvider router={router} />));

        const duration = durationMapping[contextValue.stockList.symbol1?.interval];
        const toDate = dayjs().format('YYYY-MM-DD');
        const fromDate = dayjs(toDate).subtract(duration?.qty, duration?.unit).format('YYYY-MM-DD');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api-v2.upstox.com/historical-candle/key1/30minute/${toDate}/${fromDate}`, {
            headers: {
                "Accept": "application/json",
                "Api-Version": "2.0",
                "Content-Type": "application/json",
            },
            method: 'GET',
        });
    });

    it('testing interval update', async () => {
        const routes = [
            {
                path: "stocks/:tradingSymbol",
                element: <StockListContext.Provider value={contextValue}>
                    <Script />
                </StockListContext.Provider>
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/stocks", "/stocks/symbol1"],
            initialIndex: 1,
        });

        await act(async () => render(<RouterProvider router={router} />));

        const user = userEvent.setup();

        await user.selectOptions(screen.getByRole('combobox'), ['day']);
        expect(screen.getByRole('option', { name: 'Day' }).selected).toBe(true);

        expect(mockAddStock).toHaveBeenCalledTimes(1);
    });
});