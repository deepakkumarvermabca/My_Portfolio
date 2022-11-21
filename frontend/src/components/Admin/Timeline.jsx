import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addTimeline, deleteTimeline, getUser } from "../../actions/userAction";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import "./AdminPanel.css";

const Timeline = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, message, error } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addTimeline(title, description, date));
    dispatch(getUser());
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteTimeline(id));
    dispatch(getUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
      alert.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [dispatch, alert, error, message, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            className="adminPanelInputs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="adminPanelInputs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            className="adminPanelInputs"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="adminPanelYoutubeVideos">
          {user &&
            user.timeline &&
            user.timeline.map((item) => (
              <div key={item._id} className="youtubeCard">
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1" style={{ letterSpacing: "2px" }}>
                  {item.description}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  {item.date.toString().split("T")[0]}
                </Typography>
                <Button
                  style={{
                    margin: "auto",
                    display: "block",
                    color: "rgba(40,40,40,0.7)",
                  }}
                  onClick={() => deleteHandler(item._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
