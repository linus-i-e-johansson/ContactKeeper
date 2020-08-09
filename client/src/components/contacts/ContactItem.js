import React from 'react';

const ContactItem = ({contact}) => {
    console.log(contact.type)
    const {id, name, email, phone, type} = contact;
    return (
        <div className={"card bg-lite"}>
            <h3 className={"text-primary text-left"}>
                {name}{" "}<span className={"badge "+(type === "professional" ? "badge-success" : "badge-primary")}>
                {type}
                </span>
            </h3>
        </div>
    );
};

export default ContactItem;