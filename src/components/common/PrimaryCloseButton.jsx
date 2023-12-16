import PropTypes from 'prop-types'
const PrimaryCloseButton = ({ onClickHandler, children }) => {
    return (
        <button onClick={onClickHandler} className="transition duration-200 bg-white border-2 px-3 py-1 rounded hover:border-red-200 hover:bg-red-100">{children}</button>
    )
}

PrimaryCloseButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    children: PropTypes.string
}

export default PrimaryCloseButton