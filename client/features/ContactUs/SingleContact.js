import React from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AiFillLinkedin } from "react-icons/ai";

const SingleContact = ({ name, image, description, linkedin }) => {
  return (
    <div className="my-1 mb-4 px-1  w-[200px]">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <img
          alt="Placeholder"
          className="block h-[200px] text-center object-cover"
          src={image}
        />

        <div className=" mx-2 my-2 text-[24px]">{name}</div>

        <div className="mx-2 my-2 h-[200px] text-slate-500 text-sm">
          {description}
        </div>
        <div className="flex flex-row justify-around">
          {/* <InstagramIcon style={{ fontSize: "20px" }} />
          <FacebookIcon style={{ fontSize: "20px" }} />
          <TwitterIcon style={{ fontSize: "20px" }} /> */}
          <a href={linkedin}>
            <AiFillLinkedin />
          </a>
        </div>
      </article>
    </div>
  );
};

export default SingleContact;
