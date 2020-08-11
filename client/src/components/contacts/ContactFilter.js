import React, {useContext, useRef,useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext";

const MyComponent = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts,clearFilter, filtered} = contactContext;
    const text = useRef("");

    useEffect(()=>{
        if (filtered === null){
            text.current.value = "";
        }
    })

    const onChange = (evt) => {
        if (text.current.value !== ""){
            filterContacts(evt.target.value);
        }else{
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} placeholder={"Filter Contacts..."} type="text" onChange={onChange}/>
        </form>
    );
};

export default MyComponent;
