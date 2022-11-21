import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addYoutube, getUser } from "../../actions/userAction";
import { MdKeyboardBackspace } from "react-icons/md";
import "./AdminPanel.css";

const Youtube = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, message, error } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addYoutube(title, link, image));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
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
            placeholder="Link"
            className="adminPanelInputs"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="file"
            className="adminPanelFileUpload"
            accept="image/*"
            placeholder="Choose Image"
            onChange={(e) => handleImage(e)}
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
            user.youtube &&
            user.youtube.map((item) => (
              <YoutubeCard
                key={item._id}
                url={item.url}
                title={item.title}
                image={item.image.url}
                isAdmin={true}
                id={item._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube;
