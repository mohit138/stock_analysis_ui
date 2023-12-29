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
          path=":tradingSymbol"
          element={<Script />}
        />
      </Route>
    ]
  )
);

const Root = () => {

  const { stockListContextAction: { addStocks } } = useContext(StockListContext);

  useEffect(() => {
    // TODO: remove local storage usage after BE integration
    if (window.localStorage.getItem("stockList") === null) {
      fetch(
        `${window.location.origin}/stockList.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          window.localStorage.setItem("stockList",JSON.stringify(data));
          addStocks(data);
        })
        .catch(error => console.error(error));
    } else{
      let data = window.localStorage.getItem("stockList");
      addStocks(JSON.parse(data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default Root; 