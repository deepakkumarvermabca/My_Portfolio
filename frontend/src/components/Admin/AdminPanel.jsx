import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTimeline } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../actions/userAction";
import { useAlert } from "react-alert";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message: loginMessage } = useSelector((state) => state.login);
  const { loading, error, message } = useSelector((state) => state.update);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [skills, setSkills] = useState({});
  const [about, setAbout] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, email, password, skills, about));
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleAboutImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAbout({ ...about, avatar: Reader.result });
      }
    };
  };

  const handleImages = (e, val) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        if (val === 1) {
          setSkills({ ...skills, image1: Reader.result });
        }
        if (val === 2) {
          setSkills({ ...skills, image2: Reader.result });
        }
        if (val === 3) {
          setSkills({ ...skills, image3: Reader.result });
        }
        if (val === 4) {
          setSkills({ ...skills, image4: Reader.result });
        }
        if (val === 5) {
          setSkills({ ...skills, image5: Reader.result });
        }
        if (val === 6) {
          setSkills({ ...skills, image6: Reader.result });
        }
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
  }, [alert, error, message, loginMessage, dispatch]);

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
            placeholder="Name"
            className="adminPanelInputs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="adminPanelInputs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="adminPanelInputs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="adminPanelSkill">
            <div>
              <Typography>SKILL 1</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 1)}
              />
            </div>
            <div>
              <Typography>SKILL 2</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 2)}
              />
            </div>
            <div>
              <Typography>SKILL 3</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 3)}
              />
            </div>
            <div>
              <Typography>SKILL 4</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 4)}
              />
            </div>
            <div>
              <Typography>SKILL 5</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 5)}
              />
            </div>
            <div>
              <Typography>SKILL 6</Typography>
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                onChange={(e) => handleImages(e, 6)}
              />
            </div>
          </div>
          <div className="adminPanelAbout">
            <fieldset>
              <lagend>About</lagend>
              <input
                type="text"
                placeholder="Name"
                className="adminPanelInputs"
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Title"
                className="adminPanelInputs"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subtitle"
                className="adminPanelInputs"
                value={about.subtitle}
                onChange={(e) =>
                  setAbout({ ...about, subtitle: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="adminPanelInputs"
                value={about.description}
                onChange={(e) =>
                  setAbout({ ...about, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Quote"
                className="adminPanelInputs"
                value={about.quote}
                onChange={(e) => setAbout({ ...about, quote: e.target.value })}
              />
              <input
                type="file"
                className="adminPanelFileUpload"
                accept="image/*"
                placeholder="Choose Avatar"
                onChange={(e) => handleAboutImage(e)}
              />
            </fieldset>
          </div>

          <Link to="/admin/timeline">
            TIMELINE <MdTimeline />
          </Link>
          <Link to="/admin/youtube">
            YOUTUBE <FaYoutube />
          </Link>
          <Link to="/admin/project">
            PROJECTS <AiOutlineProject />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Update
          </Button>
        </form>
        <Button
          variant="contained"
          color="error"
          style={{ display: "block", margin: "4vmax auto" }}
          onClick={logoutHandler}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
