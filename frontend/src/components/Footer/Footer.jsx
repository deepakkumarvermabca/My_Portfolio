import React from "react";
import "./Footer.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin, BsFacebook, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Deepak Kumar Verma. I am a Full-Stack Developer.
        </Typography>
        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/deepakkumarvermabca" target="blank">
          <BsGithub />
        </a>
        <a href="https://rb.gy/c8ewot" target="blank">
          <BsWhatsapp />
        </a>
        <a
          href="https://www.facebook.com/DeepakKumarVermaRamgarh"
          target="blank"
        >
          <BsFacebook />
        </a>
        <a href="https://www.linkedin.com/in/deepak-kumar-verma" target="blank">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
