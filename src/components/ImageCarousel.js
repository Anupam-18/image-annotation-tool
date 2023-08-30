import { useContext, useEffect, useRef } from "react";
import { CarouselContext } from "../context/CarouselContext";
import "../styles/ImageCarousel.css";
const ImageCarousel = () => {
  //importing all the required functions & variables from CarouselContext
  const {
    imageIndex,
    isDrawingEnabled,
    ImageData,
    zoomLevel,
    setAnnotationData,
    annotationData,
    setBoundingBoxCordinates,
    isDrawing,
    setIsDrawing,
    boundingBoxCordinates,
    latestBoundingBox,
  } = useContext(CarouselContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasOffSetX = useRef(null);
  const canvasOffSetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const left = useRef(null);
  const right = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);
  // handling canvas layout(height,width,background image)
  //and bounding box layout
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 500;
    canvas.style.backgroundImage = `url(${ImageData?.images[imageIndex]?.src})`;
    const context = canvas.getContext("2d");
    context.strokeStyle = "red";
    context.lineWidth = 2;
    contextRef.current = context;
    const canvasOffSet = canvas.getBoundingClientRect();
    canvasOffSetX.current = canvasOffSet.top;
    canvasOffSetY.current = canvasOffSet.left;
    setBoundingBoxCordinates([]);
  }, [imageIndex, ImageData?.images]);

  //box is being drawn and co-ordinated being saved
  const startDrawingRectangle = (e) => {
    e.stopPropagation();
    if (isDrawingEnabled) {
      const { nativeEvent } = e;
      startX.current = nativeEvent.clientX - canvasOffSetX.current;
      startY.current = nativeEvent.clientY - canvasOffSetY.current;
      if (isDrawing) {
        const newBoxCordinates = {
          left: left.current,
          top: top.current,
          right: right.current,
          bottom: bottom.current,
        };
        setBoundingBoxCordinates((prevState) => [
          ...prevState,
          newBoxCordinates,
        ]);
      }
      setIsDrawing(!isDrawing);
    }
  };

  //redrawing the existing co-ordinated of bounding box
  //on removal of latest bounding box
  useEffect(() => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas?.width, canvas?.height);
    boundingBoxCordinates?.forEach((rect) => {
      contextRef.current.strokeRect(
        rect.left,
        rect.top,
        rect.right - rect.left,
        rect.bottom - rect.top
      );
    });
  }, [boundingBoxCordinates, latestBoundingBox]);

  //drawing rectangle on mouse move on the image
  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetY.current;
    const rectWidth = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;
    left.current = startX.current;
    right.current = startX.current + rectWidth;
    top.current = startY.current;
    bottom.current = startY.current + rectHeight;
    contextRef.current.clearRect(
      startX.current,
      startY.current,
      rectWidth,
      rectHeight
    );
    contextRef.current.strokeRect(
      startX.current,
      startY.current,
      rectWidth,
      rectHeight
    );
  };

  //saving the bounding box co-ordinated wrt to the image id
  const saveAnnotaionData = (e) => {
    e.stopPropagation();
    //saving data only if there is a box existing on the image
    if (boundingBoxCordinates.length > 0) {
      let tempData = {
        ...annotationData,
        [imageIndex]: boundingBoxCordinates,
      };
      setAnnotationData(tempData);
    }
  };

  //downloading the json data if there is any entry of the bounding box
  const downloadAnnotationData = (e) => {
    e.stopPropagation();
    if (Object.keys(annotationData).length > 0) {
      const jsonContent = JSON.stringify(annotationData);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "annotations.json";
      link.click();
      setAnnotationData({});
    }
  };

  const stopDrawingRectangle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrawing(false);
  };

  return (
    <>
      <div style={{ transform: `scale(${zoomLevel / 100})` }}>
        <canvas
          className="canvas-container-rect"
          ref={canvasRef}
          onClick={startDrawingRectangle}
          onMouseDown={startDrawingRectangle}
          onMouseMove={drawRectangle}
          onMouseLeave={stopDrawingRectangle}
        ></canvas>
      </div>
      <div className="button-container">
        <button
          className={`button ${
            boundingBoxCordinates.length === 0 && "disabled"
          }`}
          onClick={(e) => saveAnnotaionData(e)}
          disabled={boundingBoxCordinates.length === 0}
        >
          SAVE
        </button>
        <button
          className={`button ${
            Object.keys(annotationData).length === 0 && "disabled"
          }`}
          onClick={(e) => downloadAnnotationData(e)}
          disabled={Object.keys(annotationData).length === 0}
        >
          DOWNLOAD
        </button>
      </div>
    </>
  );
};

export default ImageCarousel;
