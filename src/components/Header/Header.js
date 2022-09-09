import React, {useState} from 'react';
import "./Header.scss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment";
import ChangeEvents from "../ChangePlans/ChangeEvents";

const Header = ({today, nextHandler, prevHandler, setToday}) => {
    const [activeModal, setActiveModal] = useState(false)
    return (
        <>
            <div className={"Header"}>
                <div className={"add-event"}>
                    <button onClick={()=> setActiveModal(true)}>+</button>
                </div>
                <div className={"time-block"}>
                    <div className={"total-time-block"}>
                        <span className={"change-month"} onClick={prevHandler}>{"<"}</span>
                        <span className={"total-time"}>{today.format("MMMM yyyy")}</span>
                        <span className={"change-month"} onClick={nextHandler}>{">"}</span>
                    </div>
                    <div className={"choose-time"}>
                        <DatePicker onChange={date => setToday(moment(date))}/>
                    </div>
                </div>
            </div>
            {activeModal && <ChangeEvents AddOrChange={"add"} active={activeModal} setActive={setActiveModal}/>}
        </>
    );
};

export default Header;