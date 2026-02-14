const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Initialize Google Cloud TTS client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "path/to/your-google-credentials.json", // Get from Google Cloud Console
});

// Add this route to your Express server
app.post("/api/text-to-speech", async (req, res) => {
  try {
    const { text, language } = req.body;

    const languageCodes = {
      Kannada: "kn-IN",
      Hindi: "hi-IN",
      Tamil: "ta-IN",
      Telugu: "te-IN",
      Malayalam: "ml-IN",
    };

    const request = {
      input: { text: text },
      voice: {
        languageCode: languageCodes[language] || "en-US",
        ssmlGender: "NEUTRAL",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": response.audioContent.length,
    });
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS Error:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});

// API endpoint to generate greeting
// app.post("/api/generate-greeting", async (req, res) => {
//   try {
//     const { recipientName, occasion, tone, relationship, length } = req.body;

//     // Validate input
//     if (!recipientName) {
//       return res.status(400).json({ error: "Recipient name is required" });
//     }

//     console.log("Generating greeting for:", {
//       recipientName,
//       occasion,
//       tone,
//       relationship,
//       length,
//     });

//     // Create prompt for Claude
//     const prompt = createPrompt(
//       recipientName,
//       occasion,
//       tone,
//       relationship,
//       length,
//     );

//     // Call Claude API
//     const message = await anthropic.messages.create({
//       model: "claude-sonnet-4-5-20250929",
//       max_tokens: 1000,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     // Extract the greeting from Claude's response
//     const greeting = message.content[0].text;

//     res.json({ greeting });
//   } catch (error) {
//     console.error("Error generating greeting:", error);
//     res.status(500).json({
//       error: "Failed to generate greeting",
//       message: error.message,
//     });
//   }
// });
app.post("/api/generate-greeting", async (req, res) => {
  try {
    const { recipientName, occasion, tone, relationship, length, language } =
      req.body;

    // Validate input
    if (!recipientName) {
      return res.status(400).json({ error: "Recipient name is required" });
    }

    console.log("Generating greeting for:", {
      recipientName,
      occasion,
      tone,
      relationship,
      length,
      language,
    });

    // Create prompt for Claude
    const prompt = createPrompt(
      recipientName,
      occasion,
      tone,
      relationship,
      length,
      language || "English",
    );

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the greeting from Claude's response
    const greeting = message.content[0].text;

    res.json({ greeting });
  } catch (error) {
    console.error("Error generating greeting:", error);
    res.status(500).json({
      error: "Failed to generate greeting",
      message: error.message,
    });
  }
});

// Function to create the prompt for Claude
function createPrompt(
  recipientName,
  occasion,
  tone,
  relationship,
  length,
  language = "English",
) {
  const lengthGuide = {
    Short: "2-3 sentences, concise and sweet",
    Medium: "4-6 sentences with moderate detail",
    Long: "a full paragraph (8-12 sentences) with warm, detailed expressions",
  };

  const languageInstruction =
    language !== "English"
      ? `\n- IMPORTANT: Write the ENTIRE greeting in ${language} language. Do not mix English with ${language}. Use native ${language} script and expressions.`
      : "";

  return `Create a ${tone.toLowerCase()} greeting message for a ${relationship.toLowerCase()} named ${recipientName} for their ${occasion}.

Guidelines:
- Tone: ${tone}
- Length: ${lengthGuide[length]}
- Relationship: ${relationship}
- Language: ${language}${languageInstruction}
- Make it personal, warm, and appropriate for the occasion
- Include appropriate emojis if they fit the tone
- Do not use generic templates - make it feel genuine and heartfelt

Generate only the greeting message, without any preamble or explanation.`;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📝 Make sure your ANTHROPIC_API_KEY is set in .env file");
});
