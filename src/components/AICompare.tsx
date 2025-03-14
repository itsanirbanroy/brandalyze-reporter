
import { useState } from "react";
import { AI_MODELS, AIModel, AIModelReport } from "@/utils/reportData";
import { cn } from "@/lib/utils";

interface AICompareProps {
  reports: AIModelReport[];
  currentModel: string;
  onSelectModel: (modelId: string) => void;
}

export const AICompare = ({ reports, currentModel, onSelectModel }: AICompareProps) => {
  const [hoverModel, setHoverModel] = useState<string | null>(null);

  const handleMouseEnter = (modelId: string) => {
    setHoverModel(modelId);
  };

  const handleMouseLeave = () => {
    setHoverModel(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg transition-all duration-300">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        AI Model:
      </span>
      <div className="flex items-center gap-2 md:gap-4">
        {AI_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            onMouseEnter={() => handleMouseEnter(model.id)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "relative flex items-center px-3 py-2 rounded-md transition-all duration-300",
              "border",
              currentModel === model.id
                ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm"
                : "border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50"
            )}
            style={{
              transform: hoverModel === model.id || currentModel === model.id 
                ? "translateY(-2px)" 
                : "translateY(0)",
              boxShadow: hoverModel === model.id || currentModel === model.id 
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                : "none"
            }}
          >
            <img 
              src={model.logo} 
              alt={model.name} 
              className="h-6 w-6 mr-2 rounded-full object-cover" 
            />
            <span className="font-medium text-sm">{model.name}</span>
            
            {/* Score badge */}
            {reports.find(r => r.model.id === model.id) && (
              <div 
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: model.color }}
              >
                {reports.find(r => r.model.id === model.id)?.report.overallScore}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
