import './App.css';
import HeadlessTable from "./components/HeadlessTable/HeadlessTable";
import {useState} from "react";
import accessKey from "./helpers/accessKey";
import LoadingOverlay from 'react-loading-overlay';

function App() {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberData, setPhoneNumberData] = useState({});

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const clearTable = () => {
        setPhoneNumberData({});
    }

    const handleSubmit = (event) => {
        setLoading(true);
        fetch(`http://apilayer.net/api/validate?access_key=${accessKey}&number=${phoneNumber}&country_code=&format=1`, {
            method: 'GET'
        }).then(
            (response) => response.json()
        ).then((result) => {
            setPhoneNumberData(result);
            setLoading(false);
        })
        event.preventDefault();
    }

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text='Loading your phone number...'
        >
            <div className="App">
                <h4>Enter the phone number you want to query</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Phone Number"
                        onChange={handleChange}
                        value={phoneNumber}
                    />
                    <input
                        type="submit"
                        value="Check phone number!"
                    />
                </form>
                <button onClick={clearTable}>Clear Table</button>
                {Object.keys(phoneNumberData).length > 0 ? <HeadlessTable phoneData={phoneNumberData}/> : ""}
            </div>
        </LoadingOverlay>
    );
}

export default App;
