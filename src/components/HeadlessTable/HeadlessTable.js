import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import './HeadlessTable.css';

function HeadlessTable(props) {

    const getTableKeys = () => {
        return Object.keys(props.phoneData)
    }

    const formatKey = (key) => {
        if (key === null || key === "") {
            return;
        }
        return capitalizeFirstLetter(key.replace("_", " "));
    }

    const formatTableData = (data) => {
        if (data === null || data === "") {
            return "N/A";
        }
        if (typeof data === "boolean") {
            return data.toString();
        }
        return data;
    }

    return <table className="styled-table">
        {getTableKeys().map((key) =>
            <tbody>
            <tr key={Math.random() * 10000}>
                <td>{formatKey(key)}</td>
                <td>{formatTableData(props.phoneData[key])}</td>
            </tr>
            </tbody>
        )}
    </table>;
}

export default HeadlessTable;