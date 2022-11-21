import React, { useEffect, useState } from "react";
import "./Contact.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Contact = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    error,
    message: sendMessage,
  } = useSelector((state) => state.update);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (sendMessage) {
      alert.success(sendMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, dispatch, error, sendMessage]);

  return (
    <div className="contact">
      <div className="contactRightBar"></div>
      <div className="contactContainer">
        <form className="contactContainerForm" onSubmit={contactFormHandler}>
          <Typography variant="h4">Contact Us</Typography>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Message..."
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <Button variant="contained" type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
