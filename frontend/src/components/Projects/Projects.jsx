import React from "react";
import "./Projects.css";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AiOutlineProject } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteProject, getUser } from "../../actions/userAction";

export const ProjectCard = ({
  url,
  id,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(getUser());
  };

  return (
    <>
      <a href={url} className="projectCard" target="blank">
        <div>
          <img src={projectImage} alt="Project" />
          <Typography variant="h5">{projectTitle}</Typography>
        </div>
        <div>
          <Typography variant="h4">About Project</Typography>
          <Typography>{description}</Typography>
          <Typography variant="h6">Tech Stack : {technologies} </Typography>
        </div>
      </a>
      {isAdmin && (
        <Button
          style={{ color: "rgba(40,40,40,0.7)" }}
          onClick={() => deleteHandler(id)}
        >
          <Delete />
        </Button>
      )}
    </>
  );
};

const Projects = ({ projects }) => {
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <AiOutlineProject />
      </Typography>
      <div className="projectsWrapper">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            url={project.url}
            projectImage={project.image.url}
            projectTitle={project.title}
            description={project.description}
            technologies={project.techStack}
          />
        ))}
      </div>
      <Typography variant="h3" style={{ font: "100 1.2rem 'Ubuntu Mono'" }}>
        All The Projects Shown Above Are Made By Me <FaRegSmileWink />
      </Typography>
    </div>
  );
};

export default Projects;
