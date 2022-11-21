import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import * as THREE from "three";
import "./Home.css";
import moonImageTexture from "../../Images/moon.jpg";
import venusImageTexture from "../../Images/venus.jpg";
import spaceImageTexture from "../../Images/space.jpg";
import TimeLine from "../TimeLine/TimeLine";
import {
  SiCplusplus,
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,
  SiThreedotjs,
} from "react-icons/si";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { MouseOutlined } from "@mui/icons-material";

const Home = ({ timelines, youtubes, skills }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 4, 8);

    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load(moonImageTexture);
    const venusTexture = textureLoader.load(venusImageTexture);

    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    const pointLight = new THREE.PointLight(0xffffff, 1);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    const moonGeometery = new THREE.SphereGeometry(2, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometery, moonMaterial);

    const venusGeometery = new THREE.SphereGeometry(3, 64, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometery, venusMaterial);
    venus.position.set(8, 5, 5);

    scene.add(moon);
    scene.add(venus);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceImageTexture;

    const rotationSpeed = 0.01;
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= window.innerWidth / 2) {
        moon.rotation.x -= rotationSpeed;
        moon.rotation.y += rotationSpeed;
        venus.rotation.x -= rotationSpeed;
        venus.rotation.y += rotationSpeed;
      }
      if (e.clientX > window.innerWidth / 2) {
        moon.rotation.x -= rotationSpeed;
        moon.rotation.y -= rotationSpeed;
        venus.rotation.x -= rotationSpeed;
        venus.rotation.y -= rotationSpeed;
      }
      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= rotationSpeed;
        moon.rotation.y += rotationSpeed;
        venus.rotation.x -= rotationSpeed;
        venus.rotation.y += rotationSpeed;
      }
      if (e.clientY > window.innerHeight / 2) {
        moon.rotation.x -= rotationSpeed;
        moon.rotation.y -= rotationSpeed;
        venus.rotation.x -= rotationSpeed;
        venus.rotation.y -= rotationSpeed;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.001;
      venus.rotation.y += 0.001;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    animate();

    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;

      const skillsBox = document.getElementById("homeskillsBox");
      if (skillsBox) {
        if (window.scrollY > 1000) {
          skillsBox.style.animationName = "homeskillsBoxAnimationOn";
        } else {
          skillsBox.style.animationName = "homeskillsBoxAnimationOff";
        }
      }
    });
  }, []);

  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas>
      <div className="homeCanvasContainer">
        <Typography variant="h1">
          <p>D</p>
          <p>E</p>
          <p>E</p>
          <p>P</p>
          <p>A</p>
          <p>K</p>
        </Typography>
        <div className="homeCanvasBox">
          <Typography variant="h2">DESIGNER</Typography>
          <Typography variant="h2">PROGRAMMER</Typography>
          <Typography variant="h2">DEVELOPER</Typography>
        </div>
        <Link to="/projects">VIEW WORK</Link>
      </div>
      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>
      <div className="homeContainer">
        <Typography variant="h3">TIMELINE</Typography>
        <TimeLine timelines={timelines} />
      </div>
      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>
        <div className="homeCubeSkills">
          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img src={skills.image1.url} alt="Skill1" />
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img src={skills.image2.url} alt="Skill2" />
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={skills.image3.url} alt="Skill3" />
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={skills.image4.url} alt="Skill4" />
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={skills.image5.url} alt="Skill5" />
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={skills.image6.url} alt="Skill6" />
          </div>
        </div>
        <div className="cubeShadow"></div>
        <div className="homeskillsBox" id="homeskillsBox">
          <SiCplusplus />
          <SiReact />
          <SiJavascript />
          <SiMongodb />
          <SiNodedotjs />
          <SiExpress />
          <SiCss3 />
          <SiHtml5 />
          <SiThreedotjs />
        </div>
      </div>
      <div className="homeYoutube">
        <Typography variant="h3">YOUTUBE VIDEOS</Typography>
        <div className="homeYoutubeWrapper">
          {youtubes.map((item) => (
            <YoutubeCard
              key={item._id}
              image={item.image.url}
              title={item.url}
              url={item.url}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
