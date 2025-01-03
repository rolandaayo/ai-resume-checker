import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with error handling
const getOpenAIInstance = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  return new OpenAI({ apiKey });
};

export async function POST(request) {
  try {
    // Get and validate request body
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: Resume text is required' },
        { status: 400 }
      );
    }

    // Initialize OpenAI
    const openai = getOpenAIInstance();

    // Prepare the analysis prompt
    const prompt = `Analyze the following resume and provide detailed feedback in the following JSON format:
{
  "score": (number between 0-100),
  "improvements": {
    "format": [list of formatting improvements needed],
    "content": [list of content improvements needed],
    "skills": [list of skills-related improvements needed],
    "experience": [list of experience-related improvements needed],
    "education": [list of education-related improvements needed],
    "projects": [list of project-related improvements needed]
  },
  "foundKeywords": {
    "skills": [list of technical and soft skills found],
    "education": [list of education-related keywords found],
    "experience": [list of experience-related keywords found],
    "achievements": [list of achievement-related keywords found]
  }
}

Consider the following aspects:
1. Format: Length, contact info, readability
2. Content: Professional summary, LinkedIn profile, overall structure
3. Skills: Technical skills, soft skills, relevance
4. Experience: Action verbs, quantifiable achievements, clarity
5. Education: Degree details, certifications, academic achievements
6. Projects: Portfolio, GitHub links, project descriptions

Resume text to analyze:
${text}`;

    // Make API call with error handling
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert resume analyzer and career coach. Provide detailed, constructive feedback on resumes in the specified JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      });

      // Validate API response
      if (!completion.choices || !completion.choices[0]?.message?.content) {
        throw new Error('Invalid response from OpenAI API');
      }

      // Parse and validate the JSON response
      let analysis;
      try {
        analysis = JSON.parse(completion.choices[0].message.content);
        
        // Validate required fields
        if (!analysis.score || !analysis.improvements || !analysis.foundKeywords) {
          throw new Error('Invalid analysis format');
        }
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        throw new Error('Failed to parse analysis results');
      }

      return NextResponse.json(analysis);
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      throw new Error('Error communicating with OpenAI API');
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.status || 500 }
    );
  }
}
