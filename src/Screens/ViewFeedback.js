import React, { useState, useEffect } from 'react';
import { getImages, getFeedback} from '../Backend/FirebaseAPI'; 
import './ViewImage.css';

const ViewFeedback = ({ navigateToScreen, currentRole }) => {
  const [images, setImages] = useState([]);
  const [feedbackDots, setFeedbackDots] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const senderNavigationPath = 'ViewResults';
  const receiverNavigationPath = 'AddFeedback';
  const navigationPath = currentRole === 'Sender' ? senderNavigationPath : receiverNavigationPath;


useEffect(() => {
  async function fetchImagesAndFeedback() {
    const senderToken = '111111';
    const receiverToken = '222222'; 
    const fetchedImages = await getImages(senderToken, receiverToken);
    if (fetchedImages && fetchedImages.length > 0) {
      setImages(fetchedImages);
      setSelectedImageIndex(0); 
      const feedback = await getFeedback(senderToken, receiverToken, 0);
      if (feedback && feedback.length > 0) {
        setSelectedFeedback(feedback[0]);
      }
    }
  }

  fetchImagesAndFeedback();
}, []);


  const handleImageSelection = async (index) => {
    setSelectedImageIndex(index);
    const senderToken = 111111; 
    const receiverToken = 222222;
    const feedback = await getFeedback(senderToken, receiverToken, index);
    if (feedback && feedback.length > 0) {
      setSelectedFeedback(feedback[0]);
      setIsModalVisible(false);
    } else {
      setSelectedFeedback(null);
      setIsModalVisible(false);
    }
  };

  const handleDotClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="view-feedback-container">
      <header className="App-header">
        <h2>View Feedback</h2>
        <div className="image-selector">
          {images.map((_, index) => (
            <button key={index} onClick={() => handleImageSelection(index)}>
              Image {index + 1}
            </button>
          ))}
        </div>
        {images[selectedImageIndex] && (
          <div className="image-container">
            <img src={images[selectedImageIndex]} alt={`Image ${selectedImageIndex + 1}`} className="feedback-image" />
            <div
              className="feedback-dot"
              onClick={handleDotClick}
            ></div>
          </div>
        )}

        {isModalVisible && selectedFeedback && (
          <div className="feedback-modal">
            <p><b>Name:</b> {selectedFeedback.name}</p>
            <p><b>Sentiment:</b> {(selectedFeedback.sentiment) ? "Positive" : "Negative"}</p>
            <p><b>Element:</b> {selectedFeedback.element}</p>
            <p><b>Description:</b> {selectedFeedback.description}</p>
            <p><b>Effect:</b> {selectedFeedback.effect}</p>
            <p><b>Category:</b> {selectedFeedback.category}</p>
            <button onClick={() => setIsModalVisible(false)}>OK</button>
          </div>
        )}
        <div className="navigation-buttons">
          <button className="view-image-button" onClick={() => navigateToScreen('ViewImage')}>Back</button>
          <button className="view-image-button" onClick={() => navigateToScreen(navigationPath)}>Next</button>
        </div>
      </header>
    </div>
  );
};

export default ViewFeedback;