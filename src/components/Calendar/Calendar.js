import React, {useEffect, useState} from 'react';
import "./Calendar.scss"
import moment from "moment"
import {useDispatch, useSelector} from "react-redux";
import ChangeEvents from "../ChangePlans/ChangeEvents";
import {setEvent} from "../../store/reducer";

const Calendar = ({startDay, today}) => {

    const dispatch = useDispatch()

    const day = startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())

    const isCurrentDay = (day) => moment().isSame(day, "day")
    const isSelectedMonth = (day) => today.isSame(day, "month")

    const events = useSelector(state => state.calendarPage.events)

    const [currentEvents, setCurrentEvent] = useState([])

    const filterCurrentEvents = (events) => {
        setCurrentEvent(events.filter(event => event.time >= startDayQuery && event.time <= endDayQuery))
    }

    const startDayQuery = startDay.clone().format('X');
    const endDayQuery = startDay.clone().add(42, 'days').format('X');

    useEffect(() => {
        filterCurrentEvents(events)
    }, [today, events])

    const [activeModal, setActiveModal] = useState(false)

    return (
        <>
            <div className={"Calendar"}>
                {daysArray.map((dayItem) =>
                    <div key={dayItem.format("DDMMYYYY")}
                         className={isCurrentDay(dayItem) ? "cell current-day" : "cell"}>
                        <div className={isSelectedMonth(dayItem) ? "day" : "unselected-month day"}>
                            <div>{dayItem.format("D")}</div>
                            <div>{dayItem.format("dd")}</div>
                        </div>
                        <div className="events">
                            {
                                currentEvents
                                    .filter(event => event.time >= dayItem.format('X') && event.time <= dayItem.clone().endOf('day').format('X'))
                                    .map(event =>
                                        <div key={event.id}
                                             onClick={() => {
                                                 dispatch(setEvent(event))
                                                 setActiveModal(true)
                                             }}
                                             className={"event"}
                                        >{event.title}</div>)
                            }
                        </div>
                    </div>)}
            </div>
            {activeModal && <ChangeEvents active={activeModal} setActive={setActiveModal} AddOrChange={"edit"}/>}
        </>
    );
};

export default Calendar;