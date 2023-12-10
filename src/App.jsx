import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Root from './components/Root';
import Stocks from './components/Stocks';
import StocksList from './components/StocksList';
import Script from './components/Script';

const router = createBrowserRouter(
  // {
  //   path: "/",
  //   element: <Root/>,
  //   children:[
  //     {
  //       path:"home",
  //       element:<AppInfo/>
  //     },
  //     {
  //       path: "stocks",
  //       element: <Outlet/>,
  //       children:[
  //         {
  //           path: "",
  //           element: <Stocks/>
  //         },
  //         {
  //           path:":script",
  //           element: <Script/>
  //         }
  //       ]
  //     },
  //     {
  //       path: "login",
  //       element:<></>
  //     }
  //   ]
  // },
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


function App() {
  console.log(process.env.NODE_ENV, import.meta.env.VITE_SECRET);


  return (
    <RouterProvider router={router} />
  );

}

export default App
