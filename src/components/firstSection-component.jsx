import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

import "../styles/bodySection-styles.css";

function FirstSection() {
  return (
    <div className="section-container background-primary">
      <div className="text-side-left">This is some text on the left side</div>
      <div className="icon-side">
        <FontAwesomeIcon icon={faLeaf} />
      </div>
    </div>
  );
}

export default FirstSection;
