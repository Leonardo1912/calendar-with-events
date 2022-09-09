import React, {useState} from 'react';
import "./ChangeEvents.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {addEvent, deleteEvent, updateEvent} from "../../store/reducer";


const ChangeEvents = ({AddOrChange, active, setActive}) => {

    const dispatch = useDispatch()

    const event = useSelector(state => state.calendarPage.event)

    const [inputTitle, setInputTitle] = useState(AddOrChange === "edit" ? event.title : "")
    const [inputDescription, setInputDescription] = useState(AddOrChange === "edit" ? event.description : "")
    const [date, setDate] = useState(AddOrChange === "edit" && moment(event.time, "X").format("YYYY-MM-DD"))
    const [time, setTime] = useState(AddOrChange === "edit" && moment(event.time, "X").format("HH:mm"))
    const [error, setError] = useState(false)

    const Save = () => {
        if (inputTitle && inputDescription) {
            const newDate = moment(date).format("X")
            const newTime = moment(time, "H:m")
            const seconds = Number(newDate) + ((newTime.format("H") * 60 + Number(newTime.format("m"))) * 60)
            if (date && time) {
                AddOrChange === "edit"
                    ? dispatch(updateEvent({...event, title: inputTitle, description: inputDescription, time: seconds}))
                    : dispatch(addEvent({title: inputTitle, description: inputDescription, time: seconds}))
                setActive(false)
            } else {
                setError(true)
            }
        } else {
            setError(true)
        }
    }

    const Delete = () => {
        dispatch(deleteEvent(event.id))
        setActive(false)
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="content" onClick={event => event.stopPropagation()}>
                <div className="header">
                    <div className="title">{AddOrChange === "add" ? "Add new idea item" : "Edit idea item"}</div>
                    <div className="close"><FontAwesomeIcon icon={faXmark} onClick={() => setActive(false)}/></div>
                </div>
                <div className="body">
                    <div className="input-title"><input type="text" placeholder="Title" value={inputTitle}
                                                        onChange={e => setInputTitle(e.target.value)}/></div>
                    <div className="input-description"><textarea name="" id="" cols="30" rows="10"
                                                                 placeholder="Description" value={inputDescription}
                                                                 onChange={e => setInputDescription(e.target.value)}/>
                    </div>
                    <div className="time-block">
                        <div className="date"><input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                        </div>
                        <div className="time"><input type="time" value={time} onChange={e => setTime(e.target.value)}/>
                        </div>
                    </div>
                    {error && <div className={"error"}>Fill in the title, description, date and time field</div>}
                    <div className="button-block">
                        {AddOrChange === "edit" &&
                            <button className={"delete"} onClick={() => Delete()}><FontAwesomeIcon icon={faTrash}/></button>}
                        <button className={"save"} onClick={() => Save()}>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeEvents;