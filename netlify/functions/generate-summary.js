const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use the consistent environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async function (event, context) {
  // Ensure the request is a POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Get data from the request
    const { jobTitle, experience, skills } = JSON.parse(event.body);

    // Construct the prompt for Gemini
    const prompt = `
      Based on the following resume details:
      - Job Title: ${jobTitle}
      - Skills: ${skills.map(s => s.skill).join(', ')}
      - Experience: ${experience.map(exp => (exp.achievements || []).join('. ')).join('. ')}
      Write a concise and powerful professional summary (3-4 sentences) for a CV.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the generated summary back to the app
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: text }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
