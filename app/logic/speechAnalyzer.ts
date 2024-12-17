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
  } catch (error: any) {
    console.error("Error analyzing speech:", error);
    return { error: error.message, score: null, transcription: null };
  }
};
