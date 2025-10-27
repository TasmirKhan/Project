import SkillsAnalysis from '../SkillsAnalysis';

export default function SkillsAnalysisExample() {
  return (
    <SkillsAnalysis 
      skills={[
        { name: "JavaScript", category: "Technical Skills", proficiency: 85 },
        { name: "React", category: "Technical Skills", proficiency: 80 },
        { name: "Python", category: "Technical Skills", proficiency: 70 },
        { name: "Leadership", category: "Soft Skills", proficiency: 75 },
        { name: "Communication", category: "Soft Skills", proficiency: 90 },
        { name: "Project Management", category: "Domain Expertise", proficiency: 65 }
      ]}
    />
  );
}
