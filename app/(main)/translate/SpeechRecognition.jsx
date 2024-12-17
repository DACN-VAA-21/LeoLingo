import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react"; // Import IconMicrophoneOff

const SpeechRecognitionComponent = ({ setSourceText }) => {
  const { transcript, listening } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false); // State để quản lý trạng thái ghi âm

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }
  };

  return (
    <div>
      {isRecording ? (
        <IconMicrophoneOff
          size={22}
          className="text-gray-600 cursor-pointer"
          onClick={handleVoiceRecording}
        />
      ) : (
        <IconMicrophone
          size={22}
          className="text-gray-400 cursor-pointer" // Thêm cursor-pointer
          onClick={handleVoiceRecording}
        />
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;
