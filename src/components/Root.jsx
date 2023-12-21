import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Stocks from './Stocks';
import StocksList from './stocks_list';
import Script from './script';
import { useContext, useEffect } from "react";
import { StockListContext } from "../contexts/StockListContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    [
      <Route
        exact
        index
        key="rootRoute"
        element={<Navigate to="stocks" />}
      />,

      <Route
        path="stocks"
        key="stockRoute"
        element={<Stocks />}
      >
        <Route
          path=""
          element={<StocksList />}
        />
        <Route
          path=":script"
          element={<Script />}
        />
      </Route>
    ]
  )
);

const Root = () => {

  const { stockListContextAction: { addStocks } } = useContext(StockListContext);

  useEffect(() => {
    fetch(
      'stockList.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => addStocks(data))
      .catch(error => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default Root; 