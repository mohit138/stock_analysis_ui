import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';  

const CustomNavLink = ({ toRoute , children }) => {
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

CustomNavLink.defaultProps = {
    toRoute: ""
}

CustomNavLink.propTypes = {
    toRoute: PropTypes.string,
    children: PropTypes.string
}

export default CustomNavLink;