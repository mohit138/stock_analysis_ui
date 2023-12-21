/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Script from "../../../src/components/script";
import "@testing-library/jest-dom";
import { StockListContext } from "../../../src/contexts/StockListContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe('testing stock lists', () => {

    const contextValue = {
        stockList: {
            "name": {
                name: "name",
                tradingSymbol: "tading symbol",
                instrumentKey: "key",
                interval: "30minutes"
            }
        },
        stockListContextAction: {
            addStock: jest.fn(() => { }),
            addStocks: jest.fn(() => { })
        }
    }

    it('testing initial render', () => {

        const routes = [
            {
                path: "stocks/:script",
                element: <StockListContext.Provider value={contextValue}>
                    <Script />
                </StockListContext.Provider>
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/stocks", "/stocks/SAMPLE_SCRIPT"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);
        expect(screen.getByText(/script - sample_script/i)).toBeInTheDocument();

    });
});