import PropTypes from 'prop-types';
import { useState } from 'react';
import { intervalMapping } from "../../constants/constants";

const IntervalSelectDropdown = ({ defaultInterval, intervalUpdateHandler }) => {

    const [selectedItem, setSelectedItem] = useState(defaultInterval);
    const setInterval = (interval) => {
        setSelectedItem(interval);
        intervalUpdateHandler(interval);
    }

    const options = Object.keys(intervalMapping).map((intervalKey) => {
        return (
            <option key={intervalKey} value={intervalKey}>{intervalMapping[intervalKey]}</option>
        );
    });

    return (
        <select name="dropdown-component"
            value={selectedItem}
            onChange={e => setInterval(e.target.value)}
            className="border-2 rounded-md border-gray-700 w-full bg-white px-2 py-1 ">
            {options}
        </select>
    );
}

IntervalSelectDropdown.defaultProps = {
    defaultInterval: "30minute"
}

IntervalSelectDropdown.propTypes = {
    defaultInterval: PropTypes.string,
    intervalUpdateHandler: PropTypes.func,
}

export default IntervalSelectDropdown