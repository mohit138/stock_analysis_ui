import { useParams } from "react-router-dom";

const Script = () => {
    let { script } = useParams();
    return (
        <div>
            Script - {script}
        </div>
    );
}

export default Script; 