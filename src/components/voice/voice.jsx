import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceToTextInput = () => {
  const [text, setText] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening();
    } else {
      console.error("Sorry, your browser doesn't support speech recognition.");
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setText(transcript);
    resetTranscript();
  };

  return (
    <div>
      <button onClick={handleListen}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <p>{text}</p>
    </div>
  );
};

export default VoiceToTextInput;