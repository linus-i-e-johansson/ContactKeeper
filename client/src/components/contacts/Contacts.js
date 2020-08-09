import React,{Fragment, useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";


const Contacts = () => {
    // init context, this gives access to any state or action associated contactCtx
    const contactContext = useContext(ContactContext);
    const {contacts} = contactContext;
    return (
        <Fragment>
            {contacts.map((contact) => (
                <h3>{contact.name}</h3>
            ))}
        </Fragment>
    );
};

export default Contacts;