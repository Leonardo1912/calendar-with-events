import './App.scss';
import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import moment from "moment";
import {useState} from "react";


function App() {
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week')

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, "month"));
    const nextHandler = () => setToday(prev => prev.clone().add(1, "month"));

    return (
        <div className="App">
            <Header today={today} prevHandler={prevHandler} nextHandler={nextHandler} setToday={setToday}/>
            <Calendar startDay={startDay} today={today}/>
        </div>
    );
}

export default App;
