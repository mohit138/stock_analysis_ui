import PropTypes from 'prop-types';

const PrimaryButton = ({ onClickHandler, disabled = false, children }) => {
    return (
        <button onClick={onClickHandler} disabled={disabled} className="transition duration-200 bg-white border-2 px-3 py-1 rounded hover:border-teal-100 hover:bg-teal-50 disabled:cursor-not-allowed">{children}</button>
    )
}

PrimaryButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.string
}

export default PrimaryButton