import React from "react";
import "../css/userhome.css";
const Footer = () => {
  return (
    <div>
      <div className="bg-blue  mt-xl-5 " style={{ overflowX: "hidden" }}>
        <div className="row px-3 text-center ">
          <small className="ml-4 ml-sm-5 mb-2">
            Copyright © 2024. All rights reserved.
          </small>
          <div className="social-contact ml-4 ml-sm-auto">
            <span className="fa fa-facebook mr-4 text-sm ms-2 " />
            <span className="fa fa-google-plus mr-4 text-sm ms-2" />
            <span className="fa fa-linkedin mr-4 text-sm ms-2" />
            <span className="fa fa-twitter mr-4 mr-sm-5 text-sm ms-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
