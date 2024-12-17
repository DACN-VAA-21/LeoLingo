"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPhonemeById } from "@/db/queies";

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

    recognition.onresult = (event: any) => {
      if (!event.results || event.results.length === 0) {
        setFeedbackMessage("Không nhận diện được giọng nói");
        setIsRecording(false);
        return;
      }

      const userSpeech = normalizeString(event.results[0][0].transcript);
      const correctAnswer = normalizeString(phoneme?.example_word || "");
      const calculatedAccuracy = calculateAccuracy(userSpeech, correctAnswer);

      setStopTimer(true);
      setAccuracy(calculatedAccuracy);

      if (calculatedAccuracy >= 70) {
        setProgress((prev) => Math.min(prev + 50, 100)); // Cập nhật thanh tiến trình
        setFeedbackMessage("Xuất sắc");
        if (progress === 50) {
          setIsComplete(true);
        }
      } else {
        setFeedbackMessage("Không đúng mất rồi");
      }
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
  };

  async function fetchSentences(word: string) {
    try {
      const response = await fetch(`/api/sentences/${word}`);
      if (!response.ok) throw new Error("Error fetching sentences");

      const data = await response.json();
      return data.sentences.slice(0, 1); // Trả về câu đầu tiên
    } catch (error) {
      console.error("Error fetching sentences:", error);
      return [];
    }
  }

  const handleNext = async () => {
    if (phoneme) {
      try {
        const sentences = await fetchSentences(phoneme.example_word);
        if (sentences.length > 0) {
          setPhoneme({ ...phoneme, example_word: sentences[0] });
          setFeedbackMessage(null); // Xóa thông báo
          setIsRecording(false); // Dừng ghi âm
          setTimerExpired(false); // Đặt lại trạng thái hết giờ
          setStopTimer(false); // Đặt lại trạng thái dừng đếm
          setAccuracy(null); // Reset độ chính xác
          setTimeLeft(10); // Reset thời gian đếm ngược
        } else {
          setFeedbackMessage("Không tìm thấy câu liên quan!");
        }
      } catch (error) {
        setFeedbackMessage("Lỗi khi lấy dữ liệu từ API. Vui lòng thử lại.");
        console.error("Error:", error);
      }
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
    return (
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 Chúc mừng bạn! 🎉
        </h1>
        <p className="text-xl text-gray-700">
          Bạn đã hoàn thành bài phát âm với kết quả xuất sắc.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push("/pronunciation")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Quay lại danh sách bài tập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 space-y-8">
      {/* Thanh chạy thời gian */}
      <div className="relative w-full max-w-xl flex flex-col items-center space-y-4">
        {/* Nút "X" */}
        <button
          onClick={() => router.push("/pronunciation")}
          className="absolute top-[2.25rem] left-[-3.5rem] w-12 h-12 text-2xl text-gray-500 font-bold bg-gray-200 rounded-full hover:scale-110 transition-transform flex items-center justify-center"
        >
          X
        </button>

        {/* Hiển thị mức độ phần trăm bài làm */}
        <p className="text-xl font-bold text-gray-600">
          {progress.toFixed(0)}%
        </p>

        {/* Thanh progress */}
        <div className="relative w-full h-4 bg-gray-300 rounded-full top-[-0.5rem]">
          <div
            className="absolute top0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="text-center space-y-6 top-[-3rem]">
        <p className="text-gray-700 text-lg font-medium">HÃY NÓI CỤM SAU</p>
        {accuracy !== null ? (
          <p className="text-6xl font-bold text-yellow-500">{accuracy}%</p>
        ) : (
          <p className="text-6xl font-bold text-yellow-500">{timeLeft}</p>
        )}

        {/* Các nút chức năng */}
        <div className="flex justify-center gap-4">
          {/* Nút Volume */}
          <button
            className="bg-gray-200 text-black px-10 py-4 rounded-lg hover:scale-105 transition-transform"
            onClick={() => {
              if (phoneme?.audio_url) {
                const audio = new Audio(phoneme.audio_url);
                audio
                  .play()
                  .catch((err) => console.error("Lỗi phát âm thanh:", err));
              } else {
                alert("Không tìm thấy âm thanh của từ này!");
              }
            }}
          >
            <span className="text-3xl">🔊</span>
          </button>

          {/* Nút Slow */}
          <button
            className="bg-gray-200 text-black px-10 py-4 rounded-lg hover:scale-105 transition-transform"
            onClick={() => {
              if (phoneme?.example_word) {
                const utterance = new SpeechSynthesisUtterance(
                  phoneme.example_word
                );
                utterance.lang = phoneme.lang || "en-US";
                utterance.rate = 0.6;
                window.speechSynthesis.speak(utterance);
              } else {
                alert("Không tìm thấy từ để đọc!");
              }
            }}
          >
            <span className="text-3xl">🐌</span>
          </button>
        </div>

        {/* Phần hiển thị từ hoặc câu */}
        {phoneme && (
          <>
            <p className="text-gray-500 text-3xl font-bold">
              {phoneme.example_word}
            </p>
            <p className="text-gray-400 text-xl">{phoneme.word}</p>
          </>
        )}
      </div>

      {/* Thông báo kết quả */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-lg text-center shadow-md  ${
            feedbackMessage === "Xuất sắc"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          <p className="font-bold">{feedbackMessage}</p>

          {/* Nút Next */}
          {accuracy !== null &&
            accuracy >= 70 &&
            feedbackMessage === "Xuất sắc" &&
            progress < 100 && (
              <button
                onClick={handleNext}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Next
              </button>
            )}

          {/* Nút Retry */}
          {accuracy !== null && accuracy < 70 && (
            <button
              onClick={handleRetry}
              className="mt-2 bg-blue-500 text-white text-x2 px-8 py-3 rounded-lg hover:bg-blue-600"
            >
              Thử lại
            </button>
          )}

          {timerExpired && (
            <button
              onClick={handleRetry}
              className="mt-2 bg-blue-500 text-white text-xl px-8 py-3 rounded-lg hover:bg-blue-600"
            >
              Thử lại
            </button>
          )}
        </div>
      )}

      {/* Nút Micro */}
      {!timerExpired && (
        <button
          onClick={handleMicrophoneClick}
          className={`mt-6 p-2 rounded-full shadow-md ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-t from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M12 1.5a3 3 0 00-3 3v7a3 3 0 006 0v-7a3 3 0 00-3-3zm0 13.5a5.002 5.002 0 004.898-4H17a1 1 0 100-2h-2.172a5.002 5.002 0 00-7.656 0H5a1 1 0 100 2h.102A5.002 5.002 0 0012 15z" />
            <path d="M5.454 12.37a1 1 0 10-1.908.55A8.002 8.002 0 0012 20.25V23h-3a1 1 0 000 2h6a1 1 0 100-2h-3v-2.75a8.002 8.002 0 008.454-7.33 1 1 0 00-1.908-.55A6.002 6.002 0 0112 18a6.002 6.002 0 01-6.546-5.63z" />
          </svg>
        </button>
      )}
    </div>
  );
}
