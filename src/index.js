import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarouselContextProvider } from "./context/CarouselContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CarouselContextProvider>
      <App />
    </CarouselContextProvider>
  </React.StrictMode>
);
