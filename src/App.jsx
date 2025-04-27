import { useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

import NavBar from "./components/navBar-component";
import HeroCarousel from "./components/heroCarousel-component";
import FirstSection from "./components/firstSection-component";
import SecondSection from "./components/secondSection-component";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <HeroCarousel />
      {/* <FirstSection />
      <SecondSection /> */}
    </>
  );
}

export default App;
