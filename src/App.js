import React from "react";
import "./App.css";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ImageCarousel />
    </div>
  );
};

export default App;
