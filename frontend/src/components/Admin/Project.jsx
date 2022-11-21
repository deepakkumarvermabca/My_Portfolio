import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addProject, getUser } from "../../actions/userAction";
import { MdKeyboardBackspace } from "react-icons/md";
import { ProjectCard } from "../Projects/Projects";
import "./AdminPanel.css";

const Project = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, message, error } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, link, image, description, techStack));
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
            type="text"
            placeholder="Description"
            className="adminPanelInputs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tech Stacks"
            className="adminPanelInputs"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
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
            user.projects &&
            user.projects.map((item) => (
              <ProjectCard
                key={item._id}
                url={item.url}
                id={item._id}
                projectImage={item.image.url}
                projectTitle={item.title}
                description={item.description}
                technologies={item.techStack}
                isAdmin={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
