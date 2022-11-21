import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/sendMail.js";
import cloudinary from "cloudinary";

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully.",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// My Profile
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Contact
export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const text = `Hey, I am ${name}. My Email is ${email}. My message is ${message}.`;
    await sendMail(text);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully. Thank you...!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Admin User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, skills, about } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (skills) {
      if (skills.image1) {
        // if already present then delete that image
        if (user.skills.image1.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image2) {
        // if already present then delete that image
        if (user.skills.image2.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image3) {
        // if already present then delete that image
        if (user.skills.image3.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image4) {
        // if already present then delete that image
        if (user.skills.image4.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image5) {
        // if already present then delete that image
        if (user.skills.image5.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image6) {
        // if already present then delete that image
        if (user.skills.image6.public_id) {
          await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
        }
        // upload image
        const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
          folder: "Portfolio",
        });
        // update image in database
        user.skills.image6 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    if (about) {
      if (about.name) {
        user.about.name = about.name;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }
      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }

      if (about.avatar) {
        // if already an avatar image then delete it
        if (user.about.avatar.public_id) {
          await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
        }
        // uploading new avatar image in cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "Portfolio",
        });
        // update in database
        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User Updated Successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Timeline
export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const user = await User.findById(req.user._id);
    // adding latest event on top
    user.timeline.unshift({
      title,
      description,
      date,
    });

    user.save();

    res.status(200).json({
      success: true,
      message: "Added Into Timeline",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    // replace timeline with deletion
    user.timeline = user.timeline.filter((item) => item._id != id);

    user.save();

    res.status(200).json({
      success: true,
      message: "Deleted From Timeline",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Yoututbe
export const addYoututbe = async (req, res) => {
  try {
    const { url, title, image } = req.body;
    const user = await User.findById(req.user._id);

    // uploading image on cloudinary storage
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "Portfolio",
    });

    // adding latest event on top
    user.youtube.unshift({
      url,
      title,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    user.save();

    res.status(200).json({
      success: true,
      message: "Added Into Youtube",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const videoImage = user.youtube.find((video) => video._id == id);
    await cloudinary.v2.uploader.destroy(videoImage.image.public_id);

    // replace timeline with deletion
    user.youtube = user.youtube.filter((item) => item._id != id);

    user.save();

    res.status(200).json({
      success: true,
      message: "Deleted From Youtube",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Project
export const addProject = async (req, res) => {
  try {
    const { url, title, image, description, techStack } = req.body;
    const user = await User.findById(req.user._id);

    // uploading image on cloudinary storage
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "Portfolio",
    });

    // adding latest event on top
    user.projects.unshift({
      url,
      title,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      description,
      techStack,
    });

    user.save();

    res.status(200).json({
      success: true,
      message: "Added Into Projects",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const projectImage = user.projects.find((project) => project._id == id);
    await cloudinary.v2.uploader.destroy(projectImage.image.public_id);

    // replace timeline with deletion
    user.projects = user.projects.filter((item) => item._id != id);

    user.save();

    res.status(200).json({
      success: true,
      message: "Deleted From Project",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
