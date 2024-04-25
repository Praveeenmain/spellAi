import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import Cookies from 'js-cookie';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Main = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [userData, setUserData] = useState({});
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleCardClick = (text) => {
    setInput(text);
  };

  const fetchUserProfile = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress); // Set API status to inProgress
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://jmbackend.onrender.com/profile/';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
       
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p className='spell-title'>Spell Ai</p>
        <img src="https://static.vecteezy.com/system/resources/previews/023/841/800/original/adorable-blue-bots-small-cute-robots-generated-by-ai-free-png.png" alt="user-image" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className='result-title'>
              <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src="https://static.vecteezy.com/system/resources/previews/023/841/800/original/adorable-blue-bots-small-cute-robots-generated-by-ai-free-png.png" alt="robot" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            {userData && (
              <div className="greet">
                <p><span>Hello, {userData.name}</span></p>
                <p>I may give whatever you want....</p>
              </div>
            )}
            <div className="cards">
              <div className="card" onClick={() => handleCardClick('Suggest beautiful places to see on an upcoming road trip')}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Briefly summarize this concept: urban planning')}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Brainstorm team bonding activities for our work retreat')}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Improve the readability of the following code')}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSent(input);
              }
            }} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? <img onClick={() => onSent()}  src={assets.send_icon} width={30} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Spell may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
