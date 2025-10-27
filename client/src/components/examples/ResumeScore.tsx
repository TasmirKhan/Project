import ResumeScore from '../ResumeScore';

export default function ResumeScoreExample() {
  return (
    <ResumeScore 
      overallScore={78}
      breakdown={[
        { category: "Presentation & Formatting", score: 28, maxScore: 35 },
        { category: "Content Quality", score: 32, maxScore: 40 },
        { category: "Keyword Optimization", score: 18, maxScore: 25 }
      ]}
    />
  );
}
