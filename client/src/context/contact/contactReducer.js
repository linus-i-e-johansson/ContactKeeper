import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    UPDATE_CONTACT,
    CLEAR_FILTER
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return{
            ...state,
            contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case UPDATE_CONTACT:// maps through all the contacts and looks for the passed in id,if found it sends back the updated contact.
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
        }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        default:
            return state;
    }
}