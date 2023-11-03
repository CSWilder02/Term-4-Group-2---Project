import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './home.css'; // Make sure your 'home.css' file is in the same directory
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import CommentCard from './CommentCard';

import Logo from './code.png';
import More from './more.png';
import User from './User.png';
import Male from './male.png';
import Female from './Female.png';
import Mail from './mail.png'

export const Home = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [cards, setCards] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [showCommentInputs, setShowCommentInputs] = useState(Array(cards.length).fill(false));
  const [comments, setComments] = useState(Array(cards.length).fill([]).map(_ => []));
  const [images, setImages] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [commentTimes, setCommentTimes] = useState(Array(cards.length).fill(0)); // Keep track of comment times
  const [currentGroupName, setCurrentGroupName] = useState("Home"); // Track the currently selected group name

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
    console.log('Saved Cards:', savedCards);
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

  const Male = ""

  const [uploadedImage, setUploadedImage] = useState('');
  const fileInputRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageUrl = reader.result;
        // Display the uploaded image
        setUploadedImage(imageUrl);

        // Save the image URL in localStorage
        localStorage.setItem('uploadedImage', imageUrl);
      };
    }
  };

  // Check if there is a stored image URL in localStorage
  useEffect(() => {
    const storedImageUrl = localStorage.getItem('uploadedImage');
    if (storedImageUrl) {
      setUploadedImage(storedImageUrl);
    }
  }, []);

  // Function to trigger the file input when the button is clicked
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle text input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to handle sending text and image (if available)
  const handleSendClick = () => {
    if (inputText.trim() === '') {
      // If the input text is empty or contains only whitespace, do not add a card
      return;
    }

    // Create a new card object with both text and uploaded image URL
    const newCard = {
      text: inputText,
      imageUrl: uploadedImage,
    };

    // Add the new card to the cards state
    const newCards = [...cards, newCard]; // Create a new array with the updated data
    setCards(newCards); // Update the state with the new array

    // Clear the input text and uploaded image
    setInputText('');
    setUploadedImage('');

    // Save the state to localStorage
    saveStateToLocalStorage();
  };

  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("Saving to local storage...");
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
    const newComment = {
      text: comments[index], // Assuming you want to add the text from the input
      timestamp: new Date().toISOString(), // You can use the current timestamp
    };
    updatedComments[index].push(newComment);
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

  // Function to handle menu item clicks and update the current group name
  const handleMenuItemClick = (groupName) => {
    setCurrentGroupName(groupName);
  };

  // Function to change the CSS className based on the current page
  const changePage = (page) => {
    if (currentGroupName === page) {
      return 'button-nav-active';
    } else {
      return 'button-nav-deactive';
    }
  };

  // Function to delete the uploaded image
  const handleDeleteImage = () => {
    // Clear the image URL from localStorage
    localStorage.removeItem('uploadedImage');

    // Reset the uploadedImage state variable to an empty string
    setUploadedImage('');
  };

  // Add a new state variable to track uploaded images for each card
  const [uploadedImagesForCards, setUploadedImagesForCards] = useState(Array(cards.length).fill(''));



  return (
    <div className="Home">
      <div className="Menu">
        <Sidebar style={{ marginLeft: '48px', border: '0px' }}>
          <Menu style={{ backgroundColor: '#18191B', color: '#A3A6B5', transition: 'background-color 0.3s', padding: '10px', textAlign: 'left' }}>
            <MenuItem style={{ borderBottom: 'solid 1px #' }} onClick={() => handleMenuItemClick("Home")}> Home </MenuItem>
            <MenuItem style={{ borderBottom: 'solid 1px #4B4D55' }} onClick={() => handleMenuItemClick("New")}> New </MenuItem>
            <SubMenu style={{ borderBottom: 'solid 1px #4B4D55' }} label="First Year">
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 100")}> DV 100 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 101")}> DV 101 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 100")}> DV 102 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 101")}> DV 103 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 101")}> DV 104 </MenuItem>
            </SubMenu>
            <SubMenu style={{ borderBottom: 'solid 1px #4B4D55' }} label="Second Year">
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 200")}> DV 200 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 201")}> DV 201 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 202")}> DV 202 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 203")}> DV 203 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 204")}> DV 204 </MenuItem>
            </SubMenu>
            <SubMenu style={{ borderBottom: 'solid 1px #4B4D55' }} label="Third Year">
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 300")}> DV 300 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 301")}> DV 301 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 302")}> DV 302 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 303")}> DV 303 </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("DV 304")}> DV 304 </MenuItem>
            </SubMenu>
            <SubMenu style={{ borderBottom: 'solid 1px #4B4D55' }} label="Trending Topics">
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("React")}> React </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("Phython")}> Phython </MenuItem>
              <MenuItem style={{ backgroundColor: '#18191B' }} onClick={() => handleMenuItemClick("State Management")}> State Management </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>;
      </div>

      <div className="filter" role="group" aria-label="Basic example">
        <Col className="navBarRightContainerHome">
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} className={changePage("most asked")} onClick={e => setCurrentGroupName("most asked")}>
            <span className="material-icons md-24">local_fire_department</span>
            Most Asked
          </div>
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} className={changePage("rising")} onClick={e => setCurrentGroupName("rising")}>
            <span className="material-icons md-24">notifications</span>
            Rising
          </div>
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} className={changePage("new")} onClick={e => setCurrentGroupName("new")}>
            <span className="material-icons md-24">notifications</span>
            New
          </div>
        </Col>
      </div>

      <div className="cards-container-wrapper">
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <img src={Logo} alt="Logo" style={{ width: '32px', float: 'left', marginLeft: '20px' }} />
                <span style={{ float: 'left', marginLeft: '20px', fontSize: '15px', marginTop: '5px' }}>{currentGroupName}</span>
                {commentTimes[index] >= 60 ? (
                  <span style={{ marginLeft: '330px', fontSize: '12px' }}>
                    {Math.floor(commentTimes[index] / 60)} hours ago
                  </span>
                ) : (
                  <span style={{ marginLeft: '330px', fontSize: '12px' }}>
                    {commentTimes[index]} minutes ago
                  </span>
                )}
                <img src={More} alt="More" style={{ width: '24px', marginLeft: '20px' }} />
              </div>
              <div className="card-content">{card.text}</div>
              {card.imageUrl && (
                <div className="card-image">
                  <img
                    src={card.imageUrl}
                    alt="Uploaded Image"
                    style={{ width: '100px', height: '100px' }} // Set width and height here
                  />
                </div>
              )}
              <div className={`card-buttons card-buttons-${index}`}>
                <button className={`like-button like-button-${index}`} onClick={() => handleLikeClick(index)}>
                  ({likes[index]})
                </button>
                <button className={`dislike-button dislike-button-${index}`} onClick={() => handleDislikeClick(index)}>
                  ({dislikes[index]})
                </button>
                <button className={`comment-button comment-button-${index}`} onClick={() => handleCommentButtonClick(index)}>
                  ({comments[index].length})
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
                  <button onClick={() => handleCommentSubmit(index)}>Submit</button>
                </div>
              )}
              {comments[index].map((comment, commentIndex) => (
                <CommentCard
                  key={commentIndex}
                  commentText={comment.text}
                  timestamp={comment.timestamp}
                />
              ))}
              {card.imageUrl && (
                <div className="card-image">
                  <img src={card.imageUrl} alt="Uploaded Image" style={{ width: '100px', height: '100px' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="send" onClick={handleSendClick}></button>
        <button className='ImageUpload' onClick={handleUploadButtonClick}></button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
      {uploadedImage && (
        <div className="image-container">
          <img src={uploadedImage} alt="Uploaded Image" />
          <button onClick={handleDeleteImage}>Delete Image</button>
        </div>
      )}

      <div className='AccountSec'>
        <img style={{ width: '60px', float: 'left', marginTop: '15px', marginLeft: '20px' }} src={User} alt="Uploaded Image" />
        <p style={{ color: '#F9F5ED', marginTop: '55px', fontSize: '15px', marginRight: '130px' }}>Home</p>
        <p style={{ color: '#4B4D55', fontSize: '15px', width: '280px', textAlign: 'left', marginLeft: '20px' }}>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
        <button className='QuestionAsk'>Ask questions </button>
        <button className='CreateCom'>Create Community </button>
      </div>
      <div className='StudentSec'>
        <p className='LecTitle'>LECTURES</p>
        <div className='Lecture1'>
          <img style={{ width: '30px', float: 'left', marginLeft: '10px' }} src={Male} alt="Uploaded Image" />
          <p className='NameOfProduct'>Gordon Norman</p>
          <p className='LecEmail'>gordonnorman@gmail.com</p>
          <img style={{ width: '25px', float: 'Right', marginTop: '-12px', marginRight: '10px' }} src={Mail} alt="Uploaded Image" />
        </div>
        <br />
        <div className='Lecture2'>
          <img style={{ width: '30px', float: 'left', marginLeft: '10px', marginTop: '-8px' }} src={Female} alt="Uploaded Image" />
          <p className='NameOfProduct2'>Sonya Wolf</p>
          <p className='LecEmail'>sonyawolf@gmail.com</p>
          <img style={{ width: '25px', float: 'Right', marginTop: '-12px', marginRight: '10px' }} src={Mail} alt="Uploaded Image" />
        </div>
      </div>
      <div className='LecturerSec'>
        <p className='LecTitle'>STUDENTS</p>
        <div className='Student1'>
          <img style={{ width: '30px', float: 'left', marginLeft: '10px' }} src={Male} alt="Uploaded Image" />
          <p className='NameOfProduct'>Gordon Norman</p>
          <p className='LecEmail'>gordonnorman@gmail.com</p>
          <img style={{ width: '25px', float: 'Right', marginTop: '-12px', marginRight: '10px' }} src={Mail} alt="Uploaded Image" />
        </div>
        <br />
        <div className='Student2'>
          <img style={{ width: '30px', float: 'left', marginLeft: '10px', marginTop: '-8px' }} src={Female} alt="Uploaded Image" />
          <p className='NameOfProduct2'>Sonya Wolf</p>
          <p className='LecEmail'>sonyawolf@gmail.com</p>
          <img style={{ width: '25px', float: 'Right', marginTop: '-12px', marginRight: '10px' }} src={Mail} alt="Uploaded Image" />
        </div>
      </div>

    </div>
  );
};