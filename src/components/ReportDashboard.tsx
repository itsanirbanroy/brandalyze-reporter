
import { useState, useEffect } from "react";
import { AICompare } from "./AICompare";
import { BrandOverview } from "./BrandOverview";
import { SentimentAnalysis } from "./SentimentAnalysis";
import { StrengthWeakness } from "./StrengthWeakness";
import { TargetAudience } from "./TargetAudience";
import { MarketPosition } from "./MarketPosition";
import { Recommendations } from "./Recommendations";
import { PDFExport } from "./PDFExport";
import { getReportByModel, getAllReports } from "@/utils/reportData";
import { useToast } from "@/components/ui/use-toast";

export const ReportDashboard = () => {
  const [currentModelId, setCurrentModelId] = useState<string>("openai");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  const reports = getAllReports();
  const currentReport = getReportByModel(currentModelId);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleModelChange = (modelId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentModelId(modelId);
      setIsLoading(false);
      
      toast({
        title: "Report Changed",
        description: `Now viewing ${modelId.charAt(0).toUpperCase() + modelId.slice(1)} analysis`,
        duration: 3000,
      });
    }, 300);
  };
  
  if (!currentReport) return null;
  
  const colorAccent = currentReport.model.color;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Brand Identity Analysis</h1>
            <p className="text-muted-foreground">
              Comprehensive SEO and brand identity report powered by AI
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <AICompare 
              reports={reports}
              currentModel={currentModelId}
              onSelectModel={handleModelChange}
            />
            
            <PDFExport report={currentReport} />
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Report Sections */}
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <BrandOverview 
              report={currentReport.report} 
              colorAccent={colorAccent} 
            />
          </div>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <SentimentAnalysis 
              sentiment={currentReport.report.sentiment} 
              colorAccent={colorAccent} 
            />
          </div>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <StrengthWeakness 
              strengths={currentReport.report.strengths} 
              weaknesses={currentReport.report.weaknesses}
              colorAccent={colorAccent}
            />
          </div>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <TargetAudience 
              description={currentReport.report.targetAudience.primaryDescription}
              segments={currentReport.report.targetAudience.segments}
              colorAccent={colorAccent}
            />
          </div>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <MarketPosition 
              marketPosition={currentReport.report.marketPosition}
              colorAccent={colorAccent}
            />
          </div>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <Recommendations 
              recommendations={currentReport.report.recommendations}
              colorAccent={colorAccent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
