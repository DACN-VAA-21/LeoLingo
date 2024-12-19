"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import WordDisplay from "./WordDisplay";
import Feedback from "./Feedback";
import MicrophoneButton from "./MicrophoneButton";
import SuccessScreen from "./SuccessScreen";
import { motion } from "framer-motion";
import { analyzeSpeech } from "@/app/logic/speechAnalyzer";

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

interface Phoneme {
  id: number;
  word: string;
  symbol: string;
  example_word: string;
  audio_url: string;
  lang: string | null; // Ngôn ngữ của từ
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function PhonemePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [phoneme, setPhoneme] = useState<Phoneme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(8);
  const [progress, setProgress] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null); // Mức độ % phát âm đúng
  const [isComplete, setIsComplete] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  // Hàm chuẩn hóa chuỗi
  const normalizeString = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "");

  // Tính tỷ lệ giống nhau giữa hai chuỗi
  const calculateAccuracy = (input: string, target: string) => {
    const inputWords = input.split(" ");
    const targetWords = target.split(" ");
    const matchingWords = inputWords.filter((word) =>
      targetWords.includes(word)
    );
    const percentage = Math.min(
      Math.round((matchingWords.length / targetWords.length) * 100),
      100 // Giới hạn tối đa là 100%
    );
    return percentage;
  };

  // Gọi API lấy phoneme
  useEffect(() => {
    if (!id) return;

    async function fetchPhoneme() {
      try {
        setLoading(true);
        const response = await fetch(`/api/phoneme/${id}`);
        if (!response.ok) throw new Error("Phoneme not found");

        const data = await response.json();
        setPhoneme(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPhoneme();
  }, [id]);

  // Đếm ngược
  useEffect(() => {
    if (isRecording || timerExpired || stopTimer || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setTimerExpired(true);
          if (!stopTimer && !isRecording) {
            setFeedbackMessage("Hết thời gian mất rồi, hãy thử lại nhé");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRecording, timerExpired, stopTimer]);

  useEffect(() => {
    if (
      accuracy !== null &&
      feedbackMessage &&
      accuracy >= 70 &&
      progress < 100
    ) {
      setFeedbackMessage("Xuất sắc");
    }
  }, [accuracy, progress, feedbackMessage]);

  // Xử lý ghi âm
  const handleMicrophoneClick = () => {
    if (!SpeechRecognition) {
      setFeedbackMessage(
        "Trình duyệt của bạn không hỗ trợ nhận diện giọng nói."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = phoneme?.lang || "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      if (!event.results || event.results.length === 0) {
        setFeedbackMessage("Không nhận diện được giọng nói");
        setIsRecording(false);
        return;
      }

      const userSpeech = normalizeString(event.results[0][0].transcript);
      const correctAnswer = normalizeString(phoneme?.example_word || "");
      const { score, error, transcription } = await analyzeSpeech(
        new Blob([event.results[0][0].transcript], { type: "text/plain" }),
        correctAnswer
      );

      setStopTimer(true);
      if (error) {
        setFeedbackMessage("Không đúng mất rồi");
        setAccuracy(0);
        setStopTimer(true);
        return;
      }
      if (score !== null) {
        setAccuracy(score);
        setStopTimer(true);
        if (score >= 70) {
          setProgress((prev) => Math.min(prev + 50, 100));
          setFeedbackMessage("Xuất sắc");
          if (progress === 50) {
            setIsComplete(true);
          }
        } else {
          setFeedbackMessage("Không đúng mất rồi");
        }
      }
      setTranscription(transcription);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setStopTimer(true);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
      setFeedbackMessage(null);
      setAccuracy(null); // Reset độ chính xác trước đó
    } else {
      recognition.stop();
    }
  };

  const handleRetry = () => {
    setTimeLeft(8);
    setProgress(0);
    setFeedbackMessage(null);
    setIsRecording(false);
    setTimerExpired(false);
    setStopTimer(false); // Bắt đầu lại thời gian
    setAccuracy(null); // Reset độ chính xác
    setTranscription(null);
  };

  async function fetchSentences(phonemeId: number) {
    try {
      const response = await fetch(`/api/sentences/${phonemeId}`);
      if (!response.ok) throw new Error("Error fetching sentences");

      const data = await response.json();
      return data.sentences.map((item: { sentence: string }) => item.sentence)[0];
      //return data.sentences.slice(0, 1); // Trả về câu đầu tiên
    } catch (error) {
      console.error("Error fetching sentences:", error);
      return [];
    }
  }

  const handleNext = async () => {
    if (phoneme) {
      try {
        const sentence = await fetchSentences(phoneme.id);
        if (sentence) {
          setPhoneme({ ...phoneme, example_word: sentence }); // Cập nhật `example_word` thành câu mới
          setFeedbackMessage(null); // Xóa thông báo cũ
          setIsRecording(false); // Dừng ghi âm
          setTimerExpired(false); // Đặt lại trạng thái hết giờ
          setStopTimer(false); // Đặt lại trạng thái dừng đếm
          setAccuracy(null); // Reset độ chính xác
          setTimeLeft(10); // Đặt lại thời gian đếm ngược
          setTranscription(null);
        } else {
          setFeedbackMessage("Không tìm thấy câu liên quan!");
        }
      } catch (error) {
        setFeedbackMessage("Lỗi khi lấy dữ liệu từ API. Vui lòng thử lại.");
        console.error("Error:", error);
      }
    }
  };

  // const handleNext = async () => {
  //   if (phoneme) {
  //     try {
  //       const sentences = await fetchSentences(phoneme.id);
  //       if (sentences.length > 0) {
  //         setPhoneme({ ...phoneme, example_word: sentences[0] });
  //         setFeedbackMessage(null); // Xóa thông báo
  //         setIsRecording(false); // Dừng ghi âm
  //         setTimerExpired(false); // Đặt lại trạng thái hết giờ
  //         setStopTimer(false); // Đặt lại trạng thái dừng đếm
  //         setAccuracy(null); // Reset độ chính xác
  //         setTimeLeft(10); // Reset thời gian đếm ngược
  //         setTranscription(null);
  //       } else {
  //         setFeedbackMessage("Không tìm thấy câu liên quan!");
  //       }
  //     } catch (error) {
  //       setFeedbackMessage("Lỗi khi lấy dữ liệu từ API. Vui lòng thử lại.");
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const handleSlowClick = () => {
    if (phoneme?.example_word) {
      const utterance = new SpeechSynthesisUtterance(phoneme.example_word);
      utterance.lang = phoneme.lang || "en-US";
      utterance.rate = 0.6; // Phát âm chậm hơn bình thường
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Không tìm thấy từ hoặc câu để đọc!");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (isComplete) {
    return <SuccessScreen />;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center min-h-screen bg-gray-100 p-6 space-y-8"
    >
      {/* Nút "X" */}
      <motion.button
        onClick={() => router.push("/pronunciation")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-[2.25rem] left-[-3.5rem] w-12 h-12 text-2xl text-gray-500 font-bold bg-gray-200 rounded-full hover:scale-110 transition-transform flex items-center justify-center focus:outline-none"
      >
        X
      </motion.button>
      <ProgressBar progress={progress} />
      <Timer timeLeft={timeLeft} accuracy={accuracy} />
      {phoneme && (
        <WordDisplay
          word={phoneme.word}
          exampleWord={phoneme.example_word}
          audioUrl={phoneme.audio_url}
          lang={phoneme.lang}
          handleSlowClick={handleSlowClick}
        />
      )}
      <Feedback
        message={feedbackMessage}
        accuracy={accuracy}
        progress={progress}
        timerExpired={timerExpired}
        onRetry={handleRetry}
        onNext={handleNext}
        transcription={transcription}
        targetWord={phoneme?.example_word || ""}
      />
      <MicrophoneButton
        isRecording={isRecording}
        timerExpired={timerExpired}
        onMicrophoneClick={handleMicrophoneClick}
      />
    </motion.div>
  );
}
