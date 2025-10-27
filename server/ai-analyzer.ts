// Using OpenAI's API integration for resume analysis
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AnalysisResult {
  overallScore: number;
  scoreBreakdown: {
    category: string;
    score: number;
    maxScore: number;
  }[];
  skills: {
    name: string;
    category: string;
    proficiency: number;
  }[];
  careerRecommendations: {
    title: string;
    matchPercentage: number;
    requiredSkills: string[];
    description: string;
  }[];
  optimizationSuggestions: {
    title: string;
    priority: "high" | "medium" | "low";
    description: string;
    examples: string[];
  }[];
  experienceYears: number;
  skillsCount: number;
  careerMatchesCount: number;
}

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const prompt = `You are an expert career advisor and resume analyst. Analyze the following resume text and provide a comprehensive analysis.

Resume Text:
${resumeText}

Please provide a detailed analysis in JSON format with the following structure:
{
  "overallScore": number (0-100),
  "scoreBreakdown": [
    { "category": "Presentation & Formatting", "score": number, "maxScore": 35 },
    { "category": "Content Quality", "score": number, "maxScore": 40 },
    { "category": "Keyword Optimization", "score": number, "maxScore": 25 }
  ],
  "skills": [
    { "name": "skill name", "category": "Technical Skills|Soft Skills|Domain Expertise", "proficiency": number (0-100) }
  ],
  "careerRecommendations": [
    {
      "title": "job title",
      "matchPercentage": number (0-100),
      "requiredSkills": ["skill1", "skill2"],
      "description": "brief description of the role"
    }
  ],
  "optimizationSuggestions": [
    {
      "title": "suggestion title",
      "priority": "high|medium|low",
      "description": "detailed description",
      "examples": ["example1", "example2"]
    }
  ],
  "experienceYears": number (estimated years of professional experience),
  "skillsCount": number (total unique skills identified),
  "careerMatchesCount": number (number of career recommendations)
}

Important guidelines:
- Provide realistic scores based on actual resume content
- Identify at least 6-10 skills across different categories
- Suggest 3-5 career paths that match the candidate's background
- Provide 3-5 high-impact optimization suggestions
- Be specific and actionable in all recommendations
- Consider industry standards and best practices`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyst and career advisor. Provide detailed, actionable insights in valid JSON format only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate and ensure all required fields are present
    return {
      overallScore: result.overallScore || 70,
      scoreBreakdown: result.scoreBreakdown || [
        { category: "Presentation & Formatting", score: 25, maxScore: 35 },
        { category: "Content Quality", score: 28, maxScore: 40 },
        { category: "Keyword Optimization", score: 17, maxScore: 25 }
      ],
      skills: result.skills || [],
      careerRecommendations: result.careerRecommendations || [],
      optimizationSuggestions: result.optimizationSuggestions || [],
      experienceYears: result.experienceYears || 3,
      skillsCount: result.skills?.length || 0,
      careerMatchesCount: result.careerRecommendations?.length || 0,
    };
  } catch (error) {
    console.error("Error analyzing resume with AI:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}
