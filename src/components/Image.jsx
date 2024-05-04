import React from 'react';
import "../styles/Images.css";

const Image = ({ id, name, tag, created, size, virtualSize, labels }) => {
  return (
    <div className="imageContainerImage">
      <p className="idImage">ID: {id}</p>
      <p className="nameImage">Name: {name}</p>
      <p className="tagImage">Tag: {tag}</p>
      <p className="createdImage">Created: {new Date(created * 1000).toLocaleString()}</p>
      <p className="sizeImage">Size: {size}</p>
      <p className="virtualSizeImage">Virtual Size: {virtualSize}</p>
      <p className="labelsImage">Labels: {JSON.stringify(labels)}</p>
    </div>
  );
};

export default Image;