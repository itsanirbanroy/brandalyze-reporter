
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Recommendation } from "@/utils/reportData";
import { LightbulbIcon, Zap, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationsProps {
  recommendations: Recommendation[];
  colorAccent: string;
}

export const Recommendations = ({ recommendations, colorAccent }: RecommendationsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Zap className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "low":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      case "medium":
        return "bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300";
      case "low":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-500 overflow-hidden",
      "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
    )}>
      <div className="flex items-center mb-5">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${colorAccent}20` }}
        >
          <LightbulbIcon className="h-5 w-5" style={{ color: colorAccent }} />
        </div>
        <h2 className="text-lg font-semibold">Recommendations</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-animation">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index}
            className="card-hover bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {getPriorityIcon(recommendation.priority)}
                  <span className={cn(
                    "text-xs font-medium ml-1.5 px-2 py-0.5 rounded-full",
                    getPriorityColor(recommendation.priority)
                  )}>
                    {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-base mb-2">{recommendation.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {recommendation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
