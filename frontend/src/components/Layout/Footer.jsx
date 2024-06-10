import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <footer className={isAuthenticated ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Parthav.</div>
      <div>
        <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/watch?v=SdEomxfndoI"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/parthav-chodvadiya-506568254"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/clikit_24/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;