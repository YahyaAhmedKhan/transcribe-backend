import fs from "fs";
import Groq from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();


class Transcribe {
    private static groq = new Groq();

    static async transcribeAudio(filePath: string, language?: string): Promise<string> {
        // Use translations API if language is explicitly set to 'english'
        // Otherwise use transcriptions API (for all languages including English)
        console.log(language)
        if (language && language.toLowerCase() === 'english') {
            const translation = await Transcribe.groq.audio.translations.create({
                file: fs.createReadStream(filePath),
                model: "whisper-large-v3",
            });
            return translation.text;
        } else {
            const transcription = await Transcribe.groq.audio.transcriptions.create({
                file: fs.createReadStream(filePath),
                model: "whisper-large-v3-turbo",
            });
            return transcription.text;
        }
    }
}

export default Transcribe;