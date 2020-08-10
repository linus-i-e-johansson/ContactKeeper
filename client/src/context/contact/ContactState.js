import React,{useReducer} from "react";
import { v4 as uuidv4 } from 'uuid';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    UPDATE_CONTACT,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
     const initialState = {
        contacts:[{
            "id": 1,
            "type": "personal",
            "name": "Linus Johansson",
            "email": "l.johansson@gmail.com",
            "phone": "333-333-333-333",
        },{
            "id": 2,
            "type": "professional",
            "name": "Amanda Johansson",
            "email": "a.johansson@gmail.com",
            "phone": "222-222-222-222",
        },{
            "id": 3,
            "type": "personal",
            "name": "Rolf Johansson",
            "email": "r.johansson@gmail.com",
            "phone": "111-111-111-111",
        }
        ],
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);
    //Add
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({
            type:ADD_CONTACT,
            payload:contact
        });
    };
    // delete
    const deleteContact = id => {
        dispatch({
            type:DELETE_CONTACT,
            payload:id
        })
    }
    //set current
    //clear current
    //update
    //filter contact
    // clear filter

    return(
    <ContactContext.Provider value={
        {
            contacts:state.contacts,
            addContact,
            deleteContact
        }
    }>
        {props.children}
    </ContactContext.Provider>
    );
}
export default ContactState;