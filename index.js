require("dotenv").config();
const fs = require("fs");
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 3000;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "NEGLIGIBLE";

  try {
    const result = await model.generateContent(prompt);
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    console.error("Error generating story:", err);
    res.status(500).json({ error: "Error generating story" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Chatbot server running on port ${port}`);
});
