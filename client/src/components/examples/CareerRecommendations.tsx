import CareerRecommendations from '../CareerRecommendations';

export default function CareerRecommendationsExample() {
  return (
    <CareerRecommendations 
      recommendations={[
        {
          title: "Senior Frontend Developer",
          matchPercentage: 92,
          requiredSkills: ["React", "TypeScript", "System Design", "Team Leadership"],
          description: "Lead frontend development initiatives and mentor junior developers in a fast-paced tech environment."
        },
        {
          title: "Full Stack Engineer",
          matchPercentage: 85,
          requiredSkills: ["React", "Node.js", "Databases", "Cloud Services"],
          description: "Build end-to-end features combining frontend and backend technologies for scalable applications."
        },
        {
          title: "Technical Product Manager",
          matchPercentage: 78,
          requiredSkills: ["Technical Background", "Communication", "Product Strategy", "Agile"],
          description: "Bridge technical teams and business stakeholders to deliver impactful products."
        }
      ]}
    />
  );
}
