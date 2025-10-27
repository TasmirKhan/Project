import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumeAnalyses = pgTable("resume_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  overallScore: integer("overall_score").notNull(),
  scoreBreakdown: jsonb("score_breakdown").notNull().$type<{
    category: string;
    score: number;
    maxScore: number;
  }[]>(),
  skills: jsonb("skills").notNull().$type<{
    name: string;
    category: string;
    proficiency: number;
  }[]>(),
  careerRecommendations: jsonb("career_recommendations").notNull().$type<{
    title: string;
    matchPercentage: number;
    requiredSkills: string[];
    description: string;
  }[]>(),
  optimizationSuggestions: jsonb("optimization_suggestions").notNull().$type<{
    title: string;
    priority: "high" | "medium" | "low";
    description: string;
    examples: string[];
  }[]>(),
  experienceYears: integer("experience_years").notNull(),
  skillsCount: integer("skills_count").notNull(),
  careerMatchesCount: integer("career_matches_count").notNull(),
  analyzedAt: timestamp("analyzed_at").defaultNow().notNull(),
});

export const insertResumeAnalysisSchema = createInsertSchema(resumeAnalyses).omit({
  id: true,
  analyzedAt: true,
});

export type InsertResumeAnalysis = z.infer<typeof insertResumeAnalysisSchema>;
export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
