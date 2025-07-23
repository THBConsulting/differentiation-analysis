import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Users, DollarSign, MapPin, TrendingUp, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

interface CompetitorData {
  name: string;
  mission: string;
  budget: string;
  targetPopulation: string;
  distance: number;
  similarityScore: number;
}

interface AnalysisResultsProps {
  organizationName: string;
  zipCode: string;
  focusArea: string;
  competitors: CompetitorData[];
  marketSaturation: number;
  fundingCompetition: 'Low' | 'Medium' | 'High';
  differentiationOpportunities: string[];
}

export const AnalysisResults = ({
  organizationName,
  zipCode,
  focusArea,
  competitors,
  marketSaturation,
  fundingCompetition,
  differentiationOpportunities
}: AnalysisResultsProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const getFundingColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-success';
      case 'Medium': return 'bg-warning';
      case 'High': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const exportToPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      const opt = {
        margin: 1,
        filename: `${organizationName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_competitive_analysis.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      toast({
        title: "Generating PDF...",
        description: "Your competitive analysis report is being prepared for download.",
      });

      await html2pdf().set(opt).from(reportRef.current).save();
      
      toast({
        title: "PDF Downloaded",
        description: "Your competitive analysis report has been saved successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Export Error",
        description: "There was an issue generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <Button onClick={exportToPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export to PDF
        </Button>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="space-y-6 bg-white p-8 rounded-lg">
        {/* Report Header for PDF */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Competitive Analysis Report
          </h1>
          <h2 className="text-xl text-gray-700 mb-2">{organizationName}</h2>
          <p className="text-gray-600">
            {focusArea} organizations near {zipCode} • Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
      {/* Key Insights Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Key Insight: You're Not Alone
          </CardTitle>
          <CardDescription>
            We found <strong>{competitors.length} similar organizations</strong> operating in your area. 
            Understanding this landscape is crucial for strategic planning and fundraising success.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Saturation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Market Density
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Organizations in {focusArea}</span>
                <span className="font-medium">{competitors.length}</span>
              </div>
              <Progress value={marketSaturation} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {marketSaturation}% market saturation in your zip code area
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Funding Competition */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Funding Competition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge className={`${getFundingColor(fundingCompetition)} text-white`}>
                {fundingCompetition} Competition
              </Badge>
              <p className="text-sm text-muted-foreground">
                Based on similar organizations competing for grants and donations in your focus area.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Spread */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                {Math.round(competitors.reduce((avg, comp) => avg + comp.distance, 0) / competitors.length || 0)} mi
              </div>
              <p className="text-sm text-muted-foreground">
                Average distance to similar organizations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Organizations in Your Area</CardTitle>
          <CardDescription>
            Organizations with similar missions, target populations, or service areas that you may be competing with for funding and recognition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.slice(0, 5).map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{competitor.name}</h4>
                    <p className="text-sm text-muted-foreground">{competitor.mission}</p>
                  </div>
                  <div className="text-right text-sm space-y-1">
                    <Badge variant="outline">{competitor.distance} miles</Badge>
                    <div className="text-muted-foreground">
                      {competitor.similarityScore}% similar
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Budget:</span> {competitor.budget}
                  </div>
                  <div>
                    <span className="font-medium">Serves:</span> {competitor.targetPopulation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Differentiation Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Differentiation Opportunities
          </CardTitle>
          <CardDescription>
            Strategic recommendations to help you stand out in your local nonprofit landscape.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {differentiationOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm">{opportunity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};