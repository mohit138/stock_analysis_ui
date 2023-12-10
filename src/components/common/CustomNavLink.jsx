import { NavLink } from "react-router-dom";

const CustomNavLink = ({ toRoute = "", children }) => {
    return (
        <NavLink
            className='p-3'
            to={toRoute}
            end>
            {({ isActive }) => (
                <span className={isActive ? "text-teal-100" : "text-teal-500"}>{children}</span>
            )}
        </NavLink>
    );
}

export default CustomNavLink;