import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SingleContact from "./SingleContact";
import { ContactData } from "./ContactData";

const ContactUs = () => {
  return (
    <div>
      <h3>Synergy Connect is brought to you by the following</h3>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-around mx-1 lg:-mx-4">
          {ContactData.map((singleContact, i) => (
            <SingleContact
              key={i}
              name={singleContact.name}
              linkedin={singleContact.linkedin}
              image={singleContact.image}
              description={singleContact.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
