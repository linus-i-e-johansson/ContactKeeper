import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // #### GET Contacts ####
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  // #### ADD Contacts ####
  const addContact = async (contact) => {
    const config = { headers: { "content-type": "application/json" } };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  // ##### delete a contact #####
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  //update: updateContact gets called from the contactform and dispatches to the reducer
  const updateContact = async (contact) => {
    const config = { headers: { "content-type": "application/json" } };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
    } catch (e) {
      dispatch({
        type: CONTACT_ERROR,
        payload: e.response.msg,
      });
    }

    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };
  //set current
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //clear current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //filter contact
  const filterContacts = (name) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: name,
    });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        updateContact,
        filterContacts,
        setCurrent,
        clearFilter,
        clearContacts,
        clearCurrent,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
