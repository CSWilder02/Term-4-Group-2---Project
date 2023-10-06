import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';

export const Home = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [cards, setCards] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [showCommentInputs, setShowCommentInputs] = useState(Array(cards.length).fill(false));
  const [comments, setComments] = useState(Array(cards.length).fill(''));
  const [images, setImages] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [commentTimes, setCommentTimes] = useState(Array(cards.length).fill(0)); // Keep track of comment times

  // Function to save the state to localStorage
  const saveStateToLocalStorage = () => {
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('dislikes', JSON.stringify(dislikes));
    localStorage.setItem('showCommentInputs', JSON.stringify(showCommentInputs));
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('timestamps', JSON.stringify(timestamps));
    localStorage.setItem('groupNames', JSON.stringify(groupNames));
  };

  // Function to load the state from localStorage
  const loadStateFromLocalStorage = () => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || [];
    const savedDislikes = JSON.parse(localStorage.getItem('dislikes')) || [];
    const savedShowCommentInputs = JSON.parse(localStorage.getItem('showCommentInputs')) || [];
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const savedImages = JSON.parse(localStorage.getItem('images')) || [];
    const savedTimestamps = JSON.parse(localStorage.getItem('timestamps')) || [];
    const savedGroupNames = JSON.parse(localStorage.getItem('groupNames')) || [];

    setCards(savedCards);
    setLikes(savedLikes);
    setDislikes(savedDislikes);
    setShowCommentInputs(savedShowCommentInputs);
    setComments(savedComments);
    setImages(savedImages);
    setTimestamps(savedTimestamps);
    setGroupNames(savedGroupNames);
  };

  useEffect(() => {
    // Load the state from localStorage when the component mounts
    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    saveStateToLocalStorage();
  }, [cards, likes, dislikes, showCommentInputs, comments, images, timestamps, groupNames]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update the comment times every minute
      const now = new Date();
      const updatedCommentTimes = timestamps.map((timestamp) => {
        const postedTime = new Date(timestamp);
        const timeDifference = Math.floor((now - postedTime) / (1000 * 60)); // Difference in minutes
        return timeDifference;
      });
      setCommentTimes(updatedCommentTimes);
    }, 60000); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, [timestamps]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() !== '') {
      setCards([...cards, inputText]);
      setLikes([...likes, 0]);
      setDislikes([...dislikes, 0]);
      setShowCommentInputs([...showCommentInputs, false]);
      setComments([...comments, '']);
      setImages([...images, 'path_to_image.jpg']);
      setTimestamps([...timestamps, new Date().toISOString()]); // Use ISO format for timestamp
      setGroupNames([...groupNames, 'Group Name']);
      setInputText('');
    }
  };

  const handleCommentButtonClick = (index) => {
    const updatedShowCommentInputs = [...showCommentInputs];
    updatedShowCommentInputs[index] = !showCommentInputs[index];
    setShowCommentInputs(updatedShowCommentInputs);
  };

  const handleCommentInputChange = (index, event) => {
    const updatedComments = [...comments];
    updatedComments[index] = event.target.value;
    setComments(updatedComments);
  };

  const handleCommentSubmit = (index) => {
    const updatedComments = [...comments];
    updatedComments[index] =+ 1;
    setComments(updatedComments);
  
    // Calculate the time difference when a comment is added
    const now = new Date();
    const postedTime = new Date(timestamps[index]);
    const timeDifference = Math.floor((now - postedTime) / (1000 * 60)); // Difference in minutes
  
    // Update the comment time
    const updatedCommentTimes = [...commentTimes];
    updatedCommentTimes[index] = timeDifference;
    setCommentTimes(updatedCommentTimes);
  
    // Toggle the showCommentInputs to hide the input field after submission
    const updatedShowCommentInputs = [...showCommentInputs];
    updatedShowCommentInputs[index] = false;
    setShowCommentInputs(updatedShowCommentInputs);
  };

  const handleLikeClick = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes);
  };

  const handleDislikeClick = (index) => {
    const updatedDislikes = [...dislikes];
    updatedDislikes[index] += 1;
    setDislikes(updatedDislikes);
  };

  return (
    <div className='Home'>

        <div className='Menu'>

        </div>

<div class="filter" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Most Asked</button>
  <button type="button" class="btn btn-secondary">Rising</button>
  <button type="button" class="btn btn-secondary">New</button>
</div>

      <div className="cards-container">
        {cards.map((text, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <img style={{float: 'left', marginLeft: '10px'}} src={images[index]} alt="User" />
              <span style={{float: 'left', marginLeft: '20px'}}>{groupNames[index]}</span>
              <span style={{marginLeft: '220px'}}>{commentTimes[index]} minutes ago</span> {/* Display minutes since posted */}
              <img className='optmore' src={images[index]}  />
            </div>
            <div className="card-content">{text}</div>
            <div className={`card-buttons card-buttons-${index}`}>
  <button className={`like-button like-button-${index}`} onClick={() => handleLikeClick(index)}>
    ({likes[index]})
  </button>
  <button className={`dislike-button dislike-button-${index}`} onClick={() => handleDislikeClick(index)}>
    ({dislikes[index]})
  </button>
  <button className={`comment-button comment-button-${index}`} onClick={() => handleCommentButtonClick(index)}>
    ({comments[index]})
  </button>
</div>
            {showCommentInputs[index] && (
            <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comments[index]}
              onChange={(e) => handleCommentInputChange(index, e)}
            />
            <button className="send" onClick={() => handleCommentSubmit(index)}></button>
          </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};