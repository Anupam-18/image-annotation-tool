import { ImageData } from "../utils/Data";
import React, { createContext, useState } from "react";
export const CarouselContext = createContext(false);

export const CarouselContextProvider = ({ children }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [annotationData, setAnnotationData] = useState({});
  const [boundingBoxCordinates, setBoundingBoxCordinates] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [latestBoundingBox, setLatestBoundingBox] = useState({});

  const moveToNextBox = () => {
    setImageIndex(
      imageIndex === ImageData?.images?.length - 1 ? 0 : imageIndex + 1
    );
    setIsDrawingEnabled(false);
    setZoomLevel(100);
  };

  const moveToPrevBox = () => {
    setImageIndex(
      imageIndex === 0 ? ImageData?.images?.length - 1 : imageIndex - 1
    );
    setIsDrawingEnabled(false);
    setZoomLevel(100);
  };

  const enableDrawingRectangle = () => {
    setIsDrawingEnabled(!isDrawingEnabled);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 10) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  const removeLatestBox = () => {
    const latestBox = boundingBoxCordinates?.pop();
    setLatestBoundingBox(latestBox);
    setBoundingBoxCordinates(boundingBoxCordinates);
  };

  return (
    <CarouselContext.Provider
      value={{
        annotationData,
        moveToNextBox,
        moveToPrevBox,
        enableDrawingRectangle,
        handleZoomIn,
        handleZoomOut,
        imageIndex,
        isDrawingEnabled,
        zoomLevel,
        setAnnotationData,
        ImageData,
        boundingBoxCordinates,
        setBoundingBoxCordinates,
        removeLatestBox,
        isDrawing,
        setIsDrawing,
        latestBoundingBox,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};
