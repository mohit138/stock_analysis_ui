import CustomNavLink  from './common/CustomNavLink';

const Navbar = () => {
    return (
        <div className="bg-gray-600 flex mx-auto items-center">
            <span className="p-4 text-white text-xl">Stock Analysis</span>
            <CustomNavLink toRoute={''}> Stocks </CustomNavLink>
            <CustomNavLink toRoute={'adn'}> Script </CustomNavLink>
        </div>
    );
}

export default Navbar; 