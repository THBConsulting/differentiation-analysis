import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationData {
  organizationName: string;
  zipCode: string;
  focusArea: string;
  mission: string;
  targetPopulation: string;
  annualBudget: string;
}

interface OrganizationFormProps {
  onSubmit: (data: OrganizationData) => void;
}

const focusAreas = [
  "Education",
  "Health & Medical",
  "Human Services", 
  "Arts & Culture",
  "Environment",
  "Animal Welfare",
  "Religious",
  "Community Development",
  "Youth Development",
  "Senior Services",
  "Mental Health",
  "Housing & Homelessness",
  "Food Security",
  "Other"
];

const budgetRanges = [
  "Under $100K",
  "$100K - $500K", 
  "$500K - $1M",
  "$1M - $5M",
  "Over $5M"
];

export const OrganizationForm = ({ onSubmit }: OrganizationFormProps) => {
  const [formData, setFormData] = useState<OrganizationData>({
    organizationName: '',
    zipCode: '',
    focusArea: '',
    mission: '',
    targetPopulation: '',
    annualBudget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof OrganizationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Tell us about your organization</CardTitle>
        <CardDescription>
          We'll analyze your local nonprofit landscape to help you understand your competitive position and identify opportunities for differentiation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => updateField('organizationName', e.target.value)}
                placeholder="Enter your organization's name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">Primary Service Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => updateField('zipCode', e.target.value)}
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength={5}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="focusArea">Primary Focus Area</Label>
              <Select value={formData.focusArea} onValueChange={(value) => updateField('focusArea', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main focus area" />
                </SelectTrigger>
                <SelectContent>
                  {focusAreas.map((area) => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualBudget">Annual Budget Range</Label>
              <Select value={formData.annualBudget} onValueChange={(value) => updateField('annualBudget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => updateField('mission', e.target.value)}
              placeholder="Briefly describe your organization's mission and primary activities"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetPopulation">Target Population</Label>
            <Input
              id="targetPopulation"
              value={formData.targetPopulation}
              onChange={(e) => updateField('targetPopulation', e.target.value)}
              placeholder="e.g., Low-income families, Veterans, Youth ages 12-18"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!formData.organizationName || !formData.zipCode || !formData.focusArea || !formData.mission}
          >
            Analyze My Competition
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};