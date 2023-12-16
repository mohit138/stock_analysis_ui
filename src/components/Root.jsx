import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useLoaderData } from "react-router-dom";
import Stocks from './Stocks';
import StocksList from './stocks_list';
import Script from './Script';
import { useContext, useEffect } from "react";
import { StockListContext } from "../contexts/StockListContext";

const router = createBrowserRouter (
    createRoutesFromElements(
      [
        <Route
          exact
          index
          element={<Navigate to="stocks" />}
        />,
  
        <Route
          path="stocks"
          element={<Stocks/>}
          id="stocksRouteId"
        >
          <Route
            path=""
            element={<StocksList />}
          />
          <Route
            path=":scripts"
            element={<Script />}
          />
        </Route>
      ]
    )
  );

const Root = () => {
    
  const { stockListContextAction:{addStocks}} = useContext(StockListContext);

  useEffect(()=>{
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
  },[]);

    return (
        <RouterProvider router={router} />
    );
}

export default Root; 