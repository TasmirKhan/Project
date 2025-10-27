import { type ResumeAnalysis, type InsertResumeAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createResumeAnalysis(analysis: InsertResumeAnalysis): Promise<ResumeAnalysis>;
  getResumeAnalysis(id: string): Promise<ResumeAnalysis | undefined>;
  getAllResumeAnalyses(): Promise<ResumeAnalysis[]>;
}

export class MemStorage implements IStorage {
  private analyses: Map<string, ResumeAnalysis>;

  constructor() {
    this.analyses = new Map();
  }

  async createResumeAnalysis(insertAnalysis: InsertResumeAnalysis): Promise<ResumeAnalysis> {
    const id = randomUUID();
    const analysis: ResumeAnalysis = {
      id,
      fileName: insertAnalysis.fileName,
      fileSize: insertAnalysis.fileSize,
      overallScore: insertAnalysis.overallScore,
      scoreBreakdown: insertAnalysis.scoreBreakdown as { category: string; score: number; maxScore: number; }[],
      skills: insertAnalysis.skills as { name: string; category: string; proficiency: number; }[],
      careerRecommendations: insertAnalysis.careerRecommendations as { title: string; matchPercentage: number; requiredSkills: string[]; description: string; }[],
      optimizationSuggestions: insertAnalysis.optimizationSuggestions as { title: string; priority: "high" | "medium" | "low"; description: string; examples: string[]; }[],
      experienceYears: insertAnalysis.experienceYears,
      skillsCount: insertAnalysis.skillsCount,
      careerMatchesCount: insertAnalysis.careerMatchesCount,
      analyzedAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getResumeAnalysis(id: string): Promise<ResumeAnalysis | undefined> {
    return this.analyses.get(id);
  }

  async getAllResumeAnalyses(): Promise<ResumeAnalysis[]> {
    return Array.from(this.analyses.values()).sort(
      (a, b) => b.analyzedAt.getTime() - a.analyzedAt.getTime()
    );
  }
}

export const storage = new MemStorage();
