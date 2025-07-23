import { useState } from 'react';
import { OrganizationForm } from "@/components/OrganizationForm";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Card, CardContent } from "@/components/ui/card";

interface OrganizationData {
  organizationName: string;
  zipCode: string;
  focusArea: string;
  mission: string;
  targetPopulation: string;
  annualBudget: string;
}

// Mock data for demonstration - in real app this would come from APIs
const mockCompetitors = [
  {
    name: "Community Health Alliance",
    mission: "Providing healthcare access to underserved communities through mobile clinics and health education programs.",
    budget: "$100K - $500K",
    targetPopulation: "Low-income families, Uninsured adults",
    distance: 2.3,
    similarityScore: 87
  },
  {
    name: "Hope & Healing Center", 
    mission: "Mental health support and crisis intervention services for youth and families in crisis.",
    budget: "$500K - $1M",
    targetPopulation: "Youth ages 12-18, Families in crisis",
    distance: 4.1,
    similarityScore: 72
  },
  {
    name: "Neighborhood Support Network",
    mission: "Connecting families with resources including food assistance, housing support, and job training.",
    budget: "$1M - $5M", 
    targetPopulation: "Low-income families, Unemployed adults",
    distance: 1.8,
    similarityScore: 65
  },
  {
    name: "United Community Services",
    mission: "Comprehensive social services including childcare, senior programs, and emergency assistance.",
    budget: "$500K - $1M",
    targetPopulation: "Seniors, Working families, Emergency cases",
    distance: 6.2,
    similarityScore: 58
  },
  {
    name: "Family First Foundation",
    mission: "Strengthening families through parenting education, childcare support, and financial literacy programs.",
    budget: "$100K - $500K", 
    targetPopulation: "Parents, Young children, Low-income families",
    distance: 3.7,
    similarityScore: 54
  }
];

const generateDifferentiationOpportunities = (focusArea: string, mission: string) => {
  return [
    `Consider specializing in a specific age group or demographic within ${focusArea.toLowerCase()} to reduce direct competition.`,
    "Develop innovative service delivery methods (mobile services, virtual programs, or peer-to-peer models) that competitors aren't using.",
    "Partner with local businesses or government agencies to create unique funding streams and reduce grant competition.", 
    "Focus on measurable outcomes and data-driven impact reporting to stand out to funders who value accountability.",
    "Explore underserved geographic areas within your region where similar organizations have limited presence."
  ];
};

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<OrganizationData | null>(null);

  const handleFormSubmit = (data: OrganizationData) => {
    setAnalysisData(data);
    setShowResults(true);
  };

  const handleStartOver = () => {
    setShowResults(false);
    setAnalysisData(null);
  };

  if (showResults && analysisData) {
    return (
      <div className="min-h-screen bg-background py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Competitive Analysis for {analysisData.organizationName}
            </h1>
            <p className="text-muted-foreground mb-4">
              Based on {analysisData.focusArea} organizations near {analysisData.zipCode}
            </p>
            <button 
              onClick={handleStartOver}
              className="text-primary hover:underline text-lg"
            >
              ← Analyze a different organization
            </button>
          </div>
          
          <AnalysisResults
            organizationName={analysisData.organizationName}
            zipCode={analysisData.zipCode}
            focusArea={analysisData.focusArea}
            competitors={mockCompetitors}
            marketSaturation={73}
            fundingCompetition="High"
            differentiationOpportunities={generateDifferentiationOpportunities(
              analysisData.focusArea, 
              analysisData.mission
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Nonprofit Competitive Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand your local nonprofit landscape. Discover who you're competing with for funding and find opportunities to differentiate your organization.
          </p>
        </div>
        
        <OrganizationForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Index;