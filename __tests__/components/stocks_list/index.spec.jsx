/**
 * @jest-environment jsdom
 */
import { render, screen, within } from "@testing-library/react";
import StocksList from "../../../src/components/stocks_list";
import "@testing-library/jest-dom";
import { StockListContext } from "../../../src/contexts/StockListContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('testing stock lists', () => {


    const mockAddStock = jest.fn();
    const mockRemoveStock = jest.fn();

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
            addStocks: jest.fn(() => { }),
            removeStock: mockRemoveStock
        }
    }

    const mockNseResponse = [
        { "name": "name1", "instrumentKey": "key1", "tradingSymbol": "symbol1" },
        { "name": "name2", "instrumentKey": "key2", "tradingSymbol": "symbol2" },
        { "name": "name3", "instrumentKey": "key3", "tradingSymbol": "symbol3" },
        { "name": "name4", "instrumentKey": "key4", "tradingSymbol": "symbol4" },
    ]

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockNseResponse)
    }));

    const commonRoutes = [
        {
            path: "stocks",
            element: <StockListContext.Provider value={contextValue}>
                <StocksList />
            </StockListContext.Provider>
        },
    ];

    const commonRouter = createMemoryRouter(commonRoutes, {
        initialEntries: ["/", "/stocks"],
        initialIndex: 1,
    });

    it('testing initial render', () => {
        render(<RouterProvider router={commonRouter} />);
        expect(screen.getByText(/name1/i)).toBeInTheDocument();
    });

    it('testing add stock modal render', async () => {
        render(<RouterProvider router={commonRouter} />);

        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        const user = userEvent.setup();
        await user.click(addButton);
        expect(screen.getByText(/please search for the stock/i)).toBeInTheDocument();
    });

    it('testing add stock modal close', async () => {
        render(<RouterProvider router={commonRouter} />);

        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        const user = userEvent.setup();
        await user.click(addButton);

        const closeAddModalButton = screen.getByRole('button', {
            name: /close/i
        });
        await user.click(closeAddModalButton);

        expect(closeAddModalButton).not.toBeInTheDocument();
    });

    it('testing add stock modal stock search with name', async () => {
        render(<RouterProvider router={commonRouter} />);

        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        const user = userEvent.setup();
        await user.click(addButton);

        const searchTextBox = screen.getByRole('textbox');

        await user.type(searchTextBox, 'name');
        const searchListItem = screen.getByText(/symbol1 \| name1/i);
        expect(searchListItem).toBeInTheDocument();

        await user.click(searchListItem);

        expect(screen.getByText(/selected stock - name1/i)).toBeInTheDocument();
    });

    it('testing add stock modal stock search with symbol', async () => {
        render(<RouterProvider router={commonRouter} />);

        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        const user = userEvent.setup();
        await user.click(addButton);

        const searchTextBox = screen.getByRole('textbox');

        await user.type(searchTextBox, 'symbol');
        const searchListItem = screen.getByText(/symbol1 \| name1/i);
        expect(searchListItem).toBeInTheDocument();

        await user.click(searchListItem);

        expect(screen.getByText(/selected stock - name1/i)).toBeInTheDocument();
    });

    it('testing add stock modal adding feature', async () => {
        render(<RouterProvider router={commonRouter} />);

        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        const user = userEvent.setup();
        await user.click(addButton);

        const searchTextBox = screen.getByRole('textbox');

        await user.type(searchTextBox, 'symbol');
        const searchListItem = screen.getByText(/symbol2 \| name2/i);
        expect(searchListItem).toBeInTheDocument();

        await user.click(searchListItem);

        const view = screen.getByTestId('add-modal-buttons');

        const modalAddButton = within(view).getByRole('button', {
            name: /add/i
        });

        await user.click(modalAddButton);

        expect(mockAddStock).toHaveBeenCalledTimes(1);
    });

    it('testing edit stock modal render', async () => {
        render(<RouterProvider router={commonRouter} />);

        const editButton = screen.getByTestId('edit-button');
        const user = userEvent.setup();
        await user.click(editButton);
        expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
    });

    it('testing edit stock modal close', async () => {
        render(<RouterProvider router={commonRouter} />);

        const editButton = screen.getByTestId('edit-button');
        const user = userEvent.setup();
        await user.click(editButton);

        const closeEditModalButton = screen.getByRole('button', {
            name: /close/i
        });
        await user.click(closeEditModalButton);

        expect(closeEditModalButton).not.toBeInTheDocument();
    });

    it('testing edit stock modal dropdown change and save interval change', async () => {
        render(<RouterProvider router={commonRouter} />);

        const editButton = screen.getByTestId('edit-button');
        const user = userEvent.setup();
        await user.click(editButton);

        await user.selectOptions(screen.getByRole('combobox'), ['day']);
        expect(screen.getByRole('option', { name: 'Day' }).selected).toBe(true);

        const saveButton = screen.getByRole('button', {
            name: /save/i
        });
        await user.click(saveButton);
        expect(screen.getByText(/Day/i)).toBeInTheDocument();
    });


    it('remove stock from list',async ()=>{
        render(<RouterProvider router={commonRouter} />);

        const removeButton = screen.getByTestId('remove-button');
        const user = userEvent.setup();
        await user.click(removeButton);

        expect(mockRemoveStock).toHaveBeenCalledTimes(1);
    })

});