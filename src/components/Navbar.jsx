import CustomNavLink  from './common/CustomNavLink';

const Navbar = () => {
    return (
        <>
        <div className="bg-gray-600 flex mx-auto items-center fixed w-full z-20 top-0 start-0 h-16">
            <span className="p-4 text-white text-xl">Stock Analysis</span>
            <CustomNavLink toRoute={''}> Stocks </CustomNavLink>
            <CustomNavLink toRoute={'adn'}> Script </CustomNavLink>
        </div>
        <div className='block h-16'></div>
        </>
    );
}

export default Navbar; 