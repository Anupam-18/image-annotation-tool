# Image Annotaion Tool using React

## Table of contents

- General Description
- Technologies Used
- Features
- Launch

### General Description

A simple web app to get the image annotaion data

### Teachnologies Used

App is built using

- ReactJs
- CSS
- Context API
- Canvas API

### Features

- The application shows few images on screen, along with navigation buttons for moving both forward and backward through the images
- Enabled a way to create bounding boxes, as well as the ability to remove and resize existing bounding boxes.
- Added a button to save the bounding boxes. Any changes should be saved only when the 'Save' button is clicked.
- Provided a ‘Submit’ button to download the annotations in the form of JSON.

Structure of JSON file:

```Javascript
{
    "<IMAGE_ID>": [
        // array of all bounding boxes of the image
        {
            "x1": "<number>", // left coordinate of the box
            "y1": "<number>", // top coordinate of the box
            "x2": "<number>", // right coordinate of the box
            "y2": "<number>" // bottom coordinate of the box
        }
    ]
}
```

### Launch
