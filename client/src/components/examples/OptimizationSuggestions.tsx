import OptimizationSuggestions from '../OptimizationSuggestions';

export default function OptimizationSuggestionsExample() {
  return (
    <OptimizationSuggestions 
      suggestions={[
        {
          title: "Add Quantifiable Achievements",
          priority: "high",
          description: "Your resume lacks specific metrics and numbers. Quantifiable achievements make your impact clear and memorable.",
          examples: [
            "Instead of 'Improved sales', write 'Increased sales by 35% in Q2 2023'",
            "Instead of 'Led team', write 'Led team of 8 engineers to deliver 5 major features'",
            "Instead of 'Reduced costs', write 'Reduced operational costs by $50K annually'"
          ]
        },
        {
          title: "Optimize for ATS Keywords",
          priority: "high",
          description: "Include industry-specific keywords that align with your target roles to pass Applicant Tracking Systems.",
          examples: [
            "Add 'Agile/Scrum' if you've worked in agile environments",
            "Include specific technologies: 'React.js', 'Node.js', 'PostgreSQL'",
            "Use industry terms: 'Cross-functional collaboration', 'Stakeholder management'"
          ]
        },
        {
          title: "Improve Formatting Consistency",
          priority: "medium",
          description: "Inconsistent formatting can make your resume appear unprofessional. Standardize dates, bullet points, and headers.",
          examples: [
            "Use consistent date format: 'Jan 2020 - Dec 2022' throughout",
            "Align all bullet points and use the same style",
            "Keep font sizes consistent for similar sections"
          ]
        }
      ]}
    />
  );
}
