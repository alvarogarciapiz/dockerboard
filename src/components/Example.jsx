import React, { useEffect, useState } from 'react';
import Docker from 'dockerode';
import '../styles/example.css';

function Example() {
  const [images, setImages] = useState([]);
  const docker = new Docker({ socketPath: '/var/run/docker.sock' });

  useEffect(() => {
    docker.listImages({}, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const imageList = data.map(image => {
          return {
            name: image.RepoTags[0],
            createdAt: new Date(image.Created * 1000).toLocaleString(),
            size: image.Size,
          };
        });
        setImages(imageList);
      }
    });
  }, [docker]);

  return (
    <div>
      <h1>Dockerboard</h1>
      <h2>Docker Images</h2>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            Name: {image.name}<br />
            Created At: {image.createdAt}<br />
            Size: {image.size}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Example;