import React, { useEffect, useState, useCallback } from "react";
import Docker from "dockerode";
import Image from "./Image.jsx";
import "../styles/Images.css";

const docker = new Docker();

const Images = () => {
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = useCallback(() => {
        docker.pull(inputValue, (err, stream) => {
            if (err) {
                setMessage(`Error pulling image: ${err.message}`);
            } else {
                setMessage(`Successfully pulled image: ${inputValue}`);
            }
        });
    }, [inputValue]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        const loadImages = () => {
            docker.listImages((err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    setImages(data);
                }
            });
        };



        loadImages(); // Carga las imágenes inmediatamente
        const intervalId = setInterval(loadImages, 3000); // Carga las imágenes cada 3 segundos

        return () => {
            clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
        };
    }, []);

    const totalSize = (images.reduce((total, image) => total + image.Size, 0) / (1024 * 1024 * 1024)).toFixed(2); // En MB
    const averageSize = images.length > 0 ? (totalSize / images.length).toFixed(2) : 0;

    return (
        <div className="images">
            <div className="part1">
                <h2 className="imagesTitle">Images</h2>
                <p className="imagesDescription">Manage your current docker images effortlessly.</p>
            </div>
            <div className="part2">
                <div className="box">
                    <div className="left">
                        <h4 className="titleBox">Images</h4>
                        <p className="numberBox">{images.length}</p>
                    </div>
                    <div className="right">
                        <p className="small-numberBox">IMG</p>
                    </div>
                </div>
                <div className="box">
                    <div className="left">
                        <h4 className="titleBox">Total Image size</h4>
                        <p className="numberBox">{totalSize}</p>
                    </div>
                    <div className="right">
                        <p className="small-numberBox">GB</p>
                    </div>
                </div>
                <div className="box">
                    <div className="left">
                        <h4 className="titleBox">Average Image size</h4>
                        <p className="numberBox">{averageSize}</p>
                    </div>
                    <div className="right">
                        <p className="small-numberBox">GB</p>
                    </div>
                </div>
            </div>
            <div className="part3">
                <div className="createImageSpace">
                    <p className="createImageTitle">Create a new image</p>
                    <div className="createImageContainer">
                        <input type="text" className="createImageText" value={inputValue} onChange={handleInputChange} />
                        <button className="createImageButton" onClick={handleButtonClick} >Create</button>
                    </div>
                    {message && <p className="createImageMessage">{message}</p>}
                </div>
            </div>
            <div className="part4">
                {images.map((image, index) => {
                    const tags = image.RepoTags || [];
                    return tags.map((tag, i) => {
                        const [name, version] = tag.split(":");
                        return (
                            <Image
                                key={i}
                                id={image.Id}
                                name={name}
                                tag={version}
                                created={image.Created}
                                size={image.Size}
                                virtualSize={image.VirtualSize}
                                labels={image.Labels}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default Images;
