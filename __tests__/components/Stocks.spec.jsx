/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StockListContext } from "../../src/contexts/StockListContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Stocks from "../../src/components/Stocks";

describe('testing stock lists', () => {

    it('testing initial render', () => {

        const routes = [
            {
                path: "stocks",
                element: <StockListContext.Provider value={{}}>
                    <Stocks />
                </StockListContext.Provider>
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/stocks"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);
    });
});