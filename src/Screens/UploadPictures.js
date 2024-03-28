import React, { useState, useEffect } from 'react';
import './UploadPhoto.css';
import { addImages } from '../Backend/FirebaseAPI.js';

const UploadPictures = ({ navigateToScreen, handleImageChange, images }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    return () => {
    };
  }, []);

  const handleFileChange = async (event) => {
    const newImages = [...Array.from(event.target.files)];
    handleImageChange([...images, ...newImages]); 
  };

  const uploadImages = async () => {
    const senderToken = '111111'; 
    const receiverToken = '222222';

    try {
      const uploadSuccess = await addImages(senderToken, receiverToken, images);
      if (uploadSuccess) {
        console.log('Images uploaded successfully');
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }


  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="container">
      <header className="App-header">
        <div className="button-container">
          <button className="navigation-button" onClick={() => navigateToScreen('Home')}>Back</button>
          <button className="plus-button" onClick={handleUploadClick}>Upload Photo</button>
          <button className="navigation-button" onClick={() => {
            uploadImages()
            navigateToScreen('AddCategories')
          }}>Next</button>
        </div>
        <input type="file" id="fileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
        <div className="image-preview-container">
          {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="image-preview"/>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal">
            <button onClick={() => setModalOpen(false)} className="close-button">X</button>
            <button onClick={handleUploadClick}>Upload Photo</button>
          </div>
        )}
        {isModalOpen && <div className="modal-overlay" onClick={() => setModalOpen(false)}></div>}
      </header>
    </div>
  );
};

export default UploadPictures;
