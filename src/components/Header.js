import React, { useContext, useState } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { BiRectangle } from "react-icons/bi";
import { GiBackwardTime } from "react-icons/gi";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { CarouselContext } from "../context/CarouselContext";
import "../styles/Header.css";
const Header = () => {
  const {
    moveToNextBox,
    moveToPrevBox,
    enableDrawingRectangle,
    handleZoomIn,
    handleZoomOut,
    removeLatestBox,
  } = useContext(CarouselContext);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  return (
    <div className="header">
      <BsArrowLeftCircleFill
        onClick={() => {
          setSelectedIconIndex(null);
          moveToPrevBox();
        }}
        className="header-arrow"
      />
      <div className="headers-icons">
        <AiOutlineZoomIn
          className={selectedIconIndex === 0 && "selected"}
          onClick={() => {
            setSelectedIconIndex(0);
            handleZoomIn();
          }}
        />
        <AiOutlineZoomOut
          className={selectedIconIndex === 1 && "selected"}
          onClick={() => {
            setSelectedIconIndex(1);
            handleZoomOut();
          }}
        />
        <BiRectangle
          className={selectedIconIndex === 2 && "selected"}
          onClick={() => {
            setSelectedIconIndex(2);
            enableDrawingRectangle();
          }}
        />
        <GiBackwardTime
          className={selectedIconIndex === 3 && "selected"}
          onClick={() => {
            setSelectedIconIndex(3);
            removeLatestBox();
          }}
        />
      </div>
      <BsArrowRightCircleFill
        onClick={() => {
          setSelectedIconIndex(null);
          moveToNextBox();
        }}
        className="header-arrow"
      />
    </div>
  );
};

export default Header;
