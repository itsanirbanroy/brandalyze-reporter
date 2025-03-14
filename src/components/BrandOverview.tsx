
import { useState, useEffect } from "react";
import { BrandReport } from "@/utils/reportData";
import { ScoreChart } from "./ScoreChart";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandOverviewProps {
  report: BrandReport;
  colorAccent: string;
}

export const BrandOverview = ({ report, colorAccent }: BrandOverviewProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 border",
      "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
    )}>
      <div className="relative">
        {/* Header with slant design */}
        <div 
          className="clip-path-slant p-6 pb-12"
          style={{ 
            background: `linear-gradient(135deg, ${colorAccent}dd, ${colorAccent}99)`,
            minHeight: "140px"
          }}
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-center mb-1">
                <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {report.industry}
                </span>
                <div className="flex items-center ml-3 text-white/80 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{report.lastUpdated}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">{report.brandName}</h2>
              <p className="text-white/90 text-sm mt-2 max-w-3xl">
                {report.summary}
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <img
                src={report.logoUrl}
                alt={report.brandName}
                className="h-20 w-20 object-cover rounded shadow-lg" 
              />
            </div>
          </div>
        </div>
        
        {/* Score chart overlapping the header */}
        <div className="absolute -bottom-16 right-8">
          <ScoreChart 
            score={report.overallScore} 
            size="lg" 
            color={colorAccent}
          />
        </div>
      </div>
      
      {/* Score categories */}
      <div className="p-6 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
        {report.scoreCategories.map((category, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <ScoreChart 
              score={category.score} 
              size="sm" 
              color={colorAccent} 
              className="mr-4 flex-shrink-0"
            />
            <div>
              <h3 className="text-sm font-medium">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {category.description}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto flex-shrink-0" />
          </div>
        ))}
      </div>
    </Card>
  );
};
