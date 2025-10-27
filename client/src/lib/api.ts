import type { ResumeAnalysis } from "@shared/schema";

export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch('/api/resume/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to analyze resume');
  }

  return response.json();
}

export async function getAnalysis(id: string): Promise<ResumeAnalysis> {
  const response = await fetch(`/api/resume/analysis/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch analysis');
  }

  return response.json();
}

export async function getAllAnalyses(): Promise<ResumeAnalysis[]> {
  const response = await fetch('/api/resume/analyses');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch analyses');
  }

  return response.json();
}
