import PropTypes from 'prop-types';

export const DisabledInput = ({value}) => {
    return(
        <input value={value} disabled className="border-2 rounded-md border-gray-800 w-full bg-gray-300 px-2 py-1 text-gray-700" />
    );
}

DisabledInput.propTypes = {
    value: PropTypes.string
}

export const Input = ({value, onChange}) => {
    return(
        <input value={value} onChange={onChange} className="border-2 rounded-md border-gray-700 w-full bg-white px-2 py-1 " />
    );
}

Input.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}