export const analyzeSpeech = async (audioBlob: Blob, targetWord: string) => {
  try {
    const reader = new FileReader();
    reader.readAsText(audioBlob);
    await new Promise((resolve) => (reader.onload = resolve));

    const transcription = reader.result?.toString() || "";
    const normalizedTarget = targetWord.trim().toLowerCase();
    const normalizedTranscription = transcription.trim().toLowerCase();
    const score = normalizedTranscription.includes(normalizedTarget) ? 100 : 0;
    return { score, transcription };
  } catch (error: unknown) {
    console.error("Error analyzing speech:", error);

    // Check if the error is an instance of Error to safely access the message
    if (error instanceof Error) {
      return { error: error.message, score: null, transcription: null };
    }
    // In case the error is not an instance of Error
    return {
      error: "An unknown error occurred",
      score: null,
      transcription: null,
    };
  }
};
