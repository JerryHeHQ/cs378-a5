import React, { useState, useEffect } from 'react';
import { getImages } from '../Backend/FirebaseAPI';
import './ViewImage.css';

const ViewImage = ({ navigateToScreen, currentRole }) => {
  const senderNavigationPath = 'AddCategories';
  const receiverNavigationPath = 'AddSessions';
  const navigationPath = currentRole === 'Sender' ? senderNavigationPath : receiverNavigationPath;
  const [aspectRatio, setAspectRatio] = useState('original');
  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };
  


  const [selectedNumber, setSelectedNumber] = useState(1); 
  const [images, setImages] = useState([]); 

  useEffect(() => {
    async function fetchImages() {
      const senderToken = '111111'; 
      const receiverToken = '222222'; 
      const fetchedImages = await getImages(senderToken, receiverToken);
      if (fetchedImages) {
        setImages(fetchedImages);
      } else {
        console.error('Error fetching images from Firebase');
      }
    }

    fetchImages();
  }, []);

  const handleClick = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div>
      <header className="App-header">
        <p>ViewImage</p>
        <p className="view-dot-info">Click on the dots to view feedback.</p>

        <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
          Image Number
          {images.map((_, number) => (
            <button
              key={number + 1}
              style={{
                color: selectedNumber === number + 1 ? 'red' : 'black',
                fontSize: selectedNumber === number + 1 ? '24px' : '16px',
                backgroundColor: 'transparent',
                border: 'none',
                padding:'0px'
              }}
              onClick={() => handleClick(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>

        <div className="image-preview-container">
            {images.length > (selectedNumber -1) && (
            <div key={selectedNumber}>
              <img src={images[selectedNumber - 1]} className={`image-preview ${aspectRatio}`} alt={`Image ${selectedNumber}`} />
            </div>
          )}
        </div>

        <div>
          <button className="view-image-button">Toggle Dots</button>
          <button className="view-image-button" onClick={() => handleAspectRatioChange('original')}>Original</button>
          <button className="view-image-button" onClick={() => handleAspectRatioChange('aspect-16-9')}>16:9</button>
          <button className="view-image-button" onClick={() => handleAspectRatioChange('aspect-4-3')}>4:3</button>

        </div>
        <div className="navigation-buttons">
          <button className="view-image-button" onClick={() => navigateToScreen(navigationPath)}>Back</button>
          <button className="view-image-button" onClick={() => navigateToScreen('ViewFeedback')}>Next</button>
        </div>
      </header>
    </div>
  );
};

export default ViewImage;
