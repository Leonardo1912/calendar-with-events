const ADD_EVENT = "ADD_EVENT"
const DELETE_EVENT = "DELETE_EVENT"
const UPDATE_EVENT = "UPDATE_EVENT"
const SET_EVENT = "SET_EVENT"

let initialState = {
    events: [],
    event: {}
}

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EVENT: {
            return {...state, events: [...state.events, {...action.payload, id: state.events.length + 1}]}
        }
        case DELETE_EVENT: {
            return {...state, events: state.events.filter(event => event.id !== action.payload)}
        }
        case UPDATE_EVENT: {
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            }
        }
        case  SET_EVENT: {
            return {
                ...state, event: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const setEvent = (payload) => ({type: SET_EVENT, payload})
export const addEvent = (payload) => ({type: ADD_EVENT, payload})
export const updateEvent = (payload) => ({type: UPDATE_EVENT, payload})
export const deleteEvent = (payload) => ({type: DELETE_EVENT, payload})

export default calendarReducer