import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Stocks = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Stocks; 