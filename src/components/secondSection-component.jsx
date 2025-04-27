import React from "react";

import "../styles/bodySection-styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

function SecondSection() {
  return (
    <div className="section-container background-secondary">
      <div className="text-side-left">
        <FontAwesomeIcon icon={faDroplet} />
      </div>
      <div className="icon-side text-size">
        GPT-3 (OpenAI’s now outdated and surpassed model from 2020) training
        evaporated 700,000 liters of fresh water.
      </div>
    </div>
  );
}

export default SecondSection;
