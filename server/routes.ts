import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import * as pdfParse from "pdf-parse";
import { analyzeResume } from "./ai-analyzer";
import { insertResumeAnalysisSchema } from "@shared/schema";

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'));
    }
  }
});

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse.default(buffer);
  return data.text;
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  // For DOCX, we'll do a simple text extraction
  // In production, you'd use mammoth or similar library
  const text = buffer.toString('utf-8');
  // Remove XML-like tags and get cleaner text
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and analyze resume
  app.post("/api/resume/analyze", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = req.file;
      let resumeText = "";

      // Extract text based on file type
      if (file.mimetype === 'application/pdf') {
        resumeText = await extractTextFromPDF(file.buffer);
      } else if (file.mimetype.includes('word') || file.mimetype.includes('document')) {
        resumeText = await extractTextFromDOCX(file.buffer);
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      if (!resumeText || resumeText.length < 50) {
        return res.status(400).json({ error: "Could not extract text from resume. Please ensure the file contains readable text." });
      }

      // Analyze resume with AI
      const analysis = await analyzeResume(resumeText);

      // Store the analysis
      const resumeAnalysis = await storage.createResumeAnalysis({
        fileName: file.originalname,
        fileSize: file.size,
        overallScore: analysis.overallScore,
        scoreBreakdown: analysis.scoreBreakdown,
        skills: analysis.skills,
        careerRecommendations: analysis.careerRecommendations,
        optimizationSuggestions: analysis.optimizationSuggestions,
        experienceYears: analysis.experienceYears,
        skillsCount: analysis.skillsCount,
        careerMatchesCount: analysis.careerMatchesCount,
      });

      res.json(resumeAnalysis);
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      res.status(500).json({ 
        error: error.message || "Failed to analyze resume. Please try again." 
      });
    }
  });

  // Get a specific analysis
  app.get("/api/resume/analysis/:id", async (req, res) => {
    try {
      const analysis = await storage.getResumeAnalysis(req.params.id);
      
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error: any) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  // Get all analyses
  app.get("/api/resume/analyses", async (_req, res) => {
    try {
      const analyses = await storage.getAllResumeAnalyses();
      res.json(analyses);
    } catch (error: any) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ error: "Failed to fetch analyses" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
